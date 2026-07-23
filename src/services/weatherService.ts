import { CityLocation, WeatherData, DailyForecastItem, HourlyForecastItem, CurrentWeatherData } from '../types/weather';
import { getWmoInfo } from '../utils/wmoCodes';
import { formatDayName, formatDateShort, formatHour } from '../utils/formatters';
import { calculateActivityRecommendations, generatePackingAdvice, findBestTravelDay } from '../utils/activityIntelligence';

const GEOCODING_API_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function searchCities(query: string): Promise<CityLocation[]> {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim();
  const url = `${GEOCODING_API_BASE}?name=${encodeURIComponent(cleanQuery)}&count=10&language=en&format=json`;

  console.log(`[WeatherService] Geocoding request for query: "${cleanQuery}"`);
  console.log(`[WeatherService] Geocoding URL: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[WeatherService] Geocoding API HTTP error: ${response.status} ${response.statusText}`);
      throw new Error(`Geocoding request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(`[WeatherService] Geocoding API raw response:`, data);

    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      console.warn(`[WeatherService] No geocoding results found for query: "${cleanQuery}"`);
      return [];
    }

    const locations: CityLocation[] = data.results
      .map((item: any) => {
        const lat = typeof item.latitude === 'number' ? item.latitude : parseFloat(String(item.latitude));
        const lng = typeof item.longitude === 'number' ? item.longitude : parseFloat(String(item.longitude));

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          console.warn(`[WeatherService] Skipping geocoding result with invalid coordinates:`, item);
          return null;
        }

        return {
          id: item.id || Math.floor(Math.random() * 1000000),
          name: item.name || cleanQuery,
          latitude: lat,
          longitude: lng,
          country: item.country || '',
          country_code: item.country_code || '',
          admin1: item.admin1 || '',
          timezone: item.timezone || 'auto',
          population: item.population
        };
      })
      .filter((loc): loc is CityLocation => loc !== null);

    console.log(`[WeatherService] Successfully parsed ${locations.length} locations:`, locations);
    return locations;
  } catch (error) {
    console.error('[WeatherService] Error searching cities:', error);
    throw new Error('Failed to search locations. Please check your network connection.');
  }
}

export async function fetchWeatherData(location: CityLocation): Promise<WeatherData> {
  console.log(`[WeatherService] Preparing weather fetch for location:`, location);

  // 1. Verify latitude and longitude are valid numbers
  const lat = typeof location.latitude === 'number' ? location.latitude : parseFloat(String(location.latitude));
  const lng = typeof location.longitude === 'number' ? location.longitude : parseFloat(String(location.longitude));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    const coordErr = `Invalid coordinates for location "${location.name}": latitude (${location.latitude}), longitude (${location.longitude}).`;
    console.error(`[WeatherService] ${coordErr}`);
    throw new Error(coordErr);
  }

  const timezone = location.timezone || 'auto';

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current_weather: 'true',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset,precipitation_probability_max',
    hourly: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index',
    timezone: timezone
  });

  const url = `${FORECAST_API_BASE}?${params.toString()}`;

  console.log(`[WeatherService] Requesting forecast URL: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`[WeatherService] Forecast API HTTP error ${response.status}: ${response.statusText}`, errorText);
      throw new Error(`Weather forecast request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[WeatherService] Forecast API response received:`, data);

    // Support both current_weather and current structures from Open-Meteo
    const cw = data.current_weather || (data.current ? {
      temperature: data.current.temperature_2m ?? data.current.temperature ?? 0,
      windspeed: data.current.wind_speed_10m ?? data.current.windspeed ?? 0,
      winddirection: data.current.wind_direction_10m ?? data.current.winddirection ?? 0,
      weathercode: data.current.weather_code ?? data.current.weathercode ?? 0,
      time: data.current.time ?? new Date().toISOString()
    } : null);

    if (!cw) {
      console.error(`[WeatherService] Missing current weather object in response:`, data);
      throw new Error('Invalid weather data structure returned from Open-Meteo API.');
    }

    // 1. Current Weather Processing
    const weatherCode = cw.weathercode ?? cw.weather_code ?? 0;
    const currentWmo = getWmoInfo(weatherCode);

    // Find current hour index to extract extra current metrics (humidity, apparent temp, uv)
    const currentTimeIso = cw.time || '';
    let currentHourIndex = 0;
    if (data.hourly && Array.isArray(data.hourly.time)) {
      const foundIdx = data.hourly.time.findIndex((t: string) => t && t.startsWith(currentTimeIso.substring(0, 13)));
      if (foundIdx !== -1) currentHourIndex = foundIdx;
    }

    const current: CurrentWeatherData = {
      temperature: cw.temperature ?? 0,
      windspeed: cw.windspeed ?? cw.wind_speed ?? 0,
      winddirection: cw.winddirection ?? cw.wind_direction ?? 0,
      weathercode: weatherCode,
      time: currentTimeIso,
      relativeHumidity: data.hourly?.relative_humidity_2m?.[currentHourIndex] ?? 50,
      apparentTemperature: data.hourly?.apparent_temperature?.[currentHourIndex] ?? cw.temperature ?? 0,
      uvIndex: data.hourly?.uv_index?.[currentHourIndex] ?? 0,
      surfacePressure: 1013,
      visibility: 10000
    };

    // 2. Daily Forecast Processing (7 days)
    const dailyItems: DailyForecastItem[] = [];
    if (data.daily && Array.isArray(data.daily.time)) {
      const dailyWeatherCodes = data.daily.weathercode || data.daily.weather_code || [];
      const dailyMaxTemps = data.daily.temperature_2m_max || [];
      const dailyMinTemps = data.daily.temperature_2m_min || [];
      const dailyPrecip = data.daily.precipitation_sum || [];
      const dailyWind = data.daily.max_wind_speed_10m || data.daily.wind_speed_10m_max || [];
      const dailyUv = data.daily.uv_index_max || [];
      const dailyPrecipProb = data.daily.precipitation_probability_max || [];
      const dailySunrises = data.daily.sunrise || [];
      const dailySunsets = data.daily.sunset || [];

      for (let i = 0; i < Math.min(7, data.daily.time.length); i++) {
        const dateStr = data.daily.time[i];
        const code = dailyWeatherCodes[i] ?? 0;
        dailyItems.push({
          date: dateStr,
          dayName: formatDayName(dateStr),
          fullDateFormatted: formatDateShort(dateStr),
          maxTemp: dailyMaxTemps[i] ?? 0,
          minTemp: dailyMinTemps[i] ?? 0,
          weathercode: code,
          weatherInfo: getWmoInfo(code),
          precipitationSum: dailyPrecip[i] ?? 0,
          maxWindSpeed: dailyWind[i] ?? 0,
          uvIndexMax: dailyUv[i] ?? 0,
          precipitationProbabilityMax: dailyPrecipProb[i] ?? 0,
          sunrise: dailySunrises[i] ? formatHour(dailySunrises[i]) : '06:00 AM',
          sunset: dailySunsets[i] ? formatHour(dailySunsets[i]) : '08:00 PM'
        });
      }
    }

    // 3. Hourly Forecast Processing (Next 24 hours)
    const hourlyItems: HourlyForecastItem[] = [];
    if (data.hourly && Array.isArray(data.hourly.time)) {
      const startIndex = Math.max(0, currentHourIndex);
      const endIndex = Math.min(startIndex + 24, data.hourly.time.length);
      const hourlyWeatherCodes = data.hourly.weathercode || data.hourly.weather_code || [];
      const hourlyTemps = data.hourly.temperature_2m || [];
      const hourlyApparentTemps = data.hourly.apparent_temperature || [];
      const hourlyHumidity = data.hourly.relative_humidity_2m || [];
      const hourlyPrecipProb = data.hourly.precipitation_probability || [];
      const hourlyWindSpeed = data.hourly.wind_speed_10m || [];
      const hourlyUv = data.hourly.uv_index || [];

      for (let i = startIndex; i < endIndex; i++) {
        const tStr = data.hourly.time[i];
        const code = hourlyWeatherCodes[i] ?? 0;
        hourlyItems.push({
          time: tStr,
          hourLabel: formatHour(tStr),
          temp: hourlyTemps[i] ?? 0,
          apparentTemp: hourlyApparentTemps[i] ?? hourlyTemps[i] ?? 0,
          humidity: hourlyHumidity[i] ?? 50,
          weathercode: code,
          weatherInfo: getWmoInfo(code),
          precipProb: hourlyPrecipProb[i] ?? 0,
          windSpeed: hourlyWindSpeed[i] ?? 0,
          uvIndex: hourlyUv[i] ?? 0
        });
      }
    }

    // 4. Activity Intelligence
    const activities = calculateActivityRecommendations(current, currentWmo, dailyItems);
    const packingAdvice = generatePackingAdvice(current, dailyItems);
    const bestTravelDay = findBestTravelDay(dailyItems);

    console.log(`[WeatherService] Processed weather data successfully for ${location.name}:`, {
      current,
      dailyCount: dailyItems.length,
      hourlyCount: hourlyItems.length
    });

    return {
      location,
      current,
      currentWmo,
      daily: dailyItems,
      hourly: hourlyItems,
      activities,
      packingAdvice,
      bestTravelDay,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (error: any) {
    console.error(`[WeatherService] Error fetching weather data for "${location.name}":`, error);
    throw new Error(error.message || 'Unable to fetch weather forecast. Please check your network connection.');
  }
}

export const DEFAULT_CITIES: CityLocation[] = [
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', admin1: 'England' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', admin1: 'Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', admin1: 'Île-de-France' },
  { id: 5391959, name: 'San Francisco', latitude: 37.7749, longitude: -122.4194, country: 'United States', admin1: 'California' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', admin1: 'New South Wales' },
  { id: 292223, name: 'Dubai', latitude: 25.2582, longitude: 55.3047, country: 'United Arab Emirates', admin1: 'Dubai' }
];

