export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type SpeedUnit = 'kmh' | 'mph';

export interface CityLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string; // state/region
  timezone?: string;
  population?: number;
}

export interface WmoWeatherInfo {
  code: number;
  description: string;
  iconName: string;
  bgGradient: string;
  badgeBg: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
}

export interface CurrentWeatherData {
  temperature: number; // Raw Celsius from API
  windspeed: number;   // Raw km/h from API
  winddirection: number;
  weathercode: number;
  time: string;
  relativeHumidity: number;
  apparentTemperature: number;
  uvIndex: number;
  surfacePressure: number;
  visibility?: number;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  fullDateFormatted: string;
  maxTemp: number;
  minTemp: number;
  weathercode: number;
  weatherInfo: WmoWeatherInfo;
  precipitationSum: number;
  maxWindSpeed: number;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecastItem {
  time: string;
  hourLabel: string;
  temp: number;
  apparentTemp: number;
  humidity: number;
  weathercode: number;
  weatherInfo: WmoWeatherInfo;
  precipProb: number;
  windSpeed: number;
  uvIndex: number;
}

export interface ActivityRecommendation {
  id: string;
  title: string;
  category: string;
  score: number; // 0 to 100
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Caution';
  summary: string;
  iconName: string;
  tips: string[];
}

export interface WeatherData {
  location: CityLocation;
  current: CurrentWeatherData;
  currentWmo: WmoWeatherInfo;
  daily: DailyForecastItem[];
  hourly: HourlyForecastItem[];
  activities: ActivityRecommendation[];
  packingAdvice: string[];
  bestTravelDay: {
    dayName: string;
    date: string;
    maxTemp: number;
    minTemp: number;
    description: string;
    reason: string;
  } | null;
  fetchedAt: string;
}
