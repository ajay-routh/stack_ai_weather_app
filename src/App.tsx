import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, CloudSun, Globe } from 'lucide-react';
import { CityLocation, WeatherData, TemperatureUnit, SpeedUnit } from './types/weather';
import { fetchWeatherData, DEFAULT_CITIES } from './services/weatherService';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FavoritesBar } from './components/FavoritesBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { SevenDayForecast } from './components/SevenDayForecast';
import { WeatherCharts } from './components/WeatherCharts';
import { PlanningRecommendations } from './components/PlanningRecommendations';
import { ErrorAlert } from './components/ErrorAlert';

const STORAGE_KEY_LOCATION = 'weather_intelligence_last_city';
const STORAGE_KEY_FAVORITES = 'weather_intelligence_favorites';
const STORAGE_KEY_TEMP_UNIT = 'weather_intelligence_temp_unit';
const STORAGE_KEY_SPEED_UNIT = 'weather_intelligence_speed_unit';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<CityLocation>(DEFAULT_CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem(STORAGE_KEY_TEMP_UNIT) as TemperatureUnit) || 'celsius';
  });

  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>(() => {
    return (localStorage.getItem(STORAGE_KEY_SPEED_UNIT) as SpeedUnit) || 'kmh';
  });

  const [favorites, setFavorites] = useState<CityLocation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAVORITES);
      return saved ? JSON.parse(saved) : [DEFAULT_CITIES[0], DEFAULT_CITIES[1], DEFAULT_CITIES[2]];
    } catch {
      return [DEFAULT_CITIES[0], DEFAULT_CITIES[1], DEFAULT_CITIES[2]];
    }
  });

  // Save unit preferences
  const handleToggleTempUnit = (unit: TemperatureUnit) => {
    setTempUnit(unit);
    localStorage.setItem(STORAGE_KEY_TEMP_UNIT, unit);
  };

  const handleToggleSpeedUnit = (unit: SpeedUnit) => {
    setSpeedUnit(unit);
    localStorage.setItem(STORAGE_KEY_SPEED_UNIT, unit);
  };

  // Fetch weather data
  const loadWeather = useCallback(async (location: CityLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setSelectedLocation(location);
      localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(location));
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred while fetching weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize app on mount
  useEffect(() => {
    let initialCity = DEFAULT_CITIES[0];
    try {
      const savedLoc = localStorage.getItem(STORAGE_KEY_LOCATION);
      if (savedLoc) {
        initialCity = JSON.parse(savedLoc);
      }
    } catch (e) {
      console.warn('Could not read saved location from localStorage:', e);
    }
    loadWeather(initialCity);
  }, [loadWeather]);

  // Handle Favorites Toggle
  const toggleFavorite = (city: CityLocation) => {
    const exists = favorites.some((f) => f.id === city.id || f.name.toLowerCase() === city.name.toLowerCase());
    let updated: CityLocation[];
    if (exists) {
      updated = favorites.filter((f) => f.id !== city.id && f.name.toLowerCase() !== city.name.toLowerCase());
    } else {
      updated = [...favorites, city];
    }
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
  };

  const removeFavorite = (cityId: number) => {
    const updated = favorites.filter((f) => f.id !== cityId);
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
  };

  const isCurrentFavorite = weatherData
    ? favorites.some((f) => f.id === weatherData.location.id || f.name.toLowerCase() === weatherData.location.name.toLowerCase())
    : false;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col">
      {/* App Header */}
      <Header
        tempUnit={tempUnit}
        onToggleTempUnit={handleToggleTempUnit}
        speedUnit={speedUnit}
        onToggleSpeedUnit={handleToggleSpeedUnit}
        onRefresh={() => loadWeather(selectedLocation)}
        isRefreshing={isLoading}
        fetchedAt={weatherData?.fetchedAt}
        favoritesCount={favorites.length}
      />

      {/* Main App Canvas */}
      <main className="flex-1 pb-16">
        {/* City Search Bar & Presets */}
        <SearchBar
          onSelectLocation={loadWeather}
          selectedLocation={selectedLocation}
          isLoadingWeather={isLoading}
        />

        {/* Saved Favorites Quick Access Bar */}
        <FavoritesBar
          favorites={favorites}
          onSelectCity={loadWeather}
          onRemoveFavorite={removeFavorite}
          currentCityId={selectedLocation.id}
        />

        {/* Loading State Skeleton */}
        {isLoading && !weatherData && (
          <div className="w-full max-w-4xl mx-auto my-16 px-4 text-center space-y-4">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center justify-center min-h-[320px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <CloudSun className="w-8 h-8 animate-pulse text-sky-400" />
                </div>
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin absolute -top-2 -right-2" />
              </div>
              <h3 className="text-lg font-bold text-white mt-6">
                Fetching Atmospheric Forecast...
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Accessing Open-Meteo High Resolution Climate Data for {selectedLocation.name}
              </p>
            </div>
          </div>
        )}

        {/* Error Alert Display */}
        {error && !isLoading && (
          <ErrorAlert
            message={error}
            onRetry={() => loadWeather(selectedLocation)}
            onResetDefault={() => loadWeather(DEFAULT_CITIES[0])}
          />
        )}

        {/* Weather Dashboard Main Display */}
        {weatherData && (
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
            {/* 1. Hero Current Weather Card */}
            <CurrentWeatherCard
              weather={weatherData}
              tempUnit={tempUnit}
              speedUnit={speedUnit}
              isFavorite={isCurrentFavorite}
              onToggleFavorite={() => toggleFavorite(weatherData.location)}
            />

            {/* 2. 24-Hour Hourly Timeline */}
            <HourlyForecast
              hourly={weatherData.hourly}
              tempUnit={tempUnit}
            />

            {/* 3. Visual Charts (Temperature Trend & Rain Probability) */}
            <WeatherCharts
              daily={weatherData.daily}
              hourly={weatherData.hourly}
              tempUnit={tempUnit}
            />

            {/* 4. 7-Day Daily Forecast Outlook */}
            <SevenDayForecast
              daily={weatherData.daily}
              tempUnit={tempUnit}
              speedUnit={speedUnit}
            />

            {/* 5. Outdoor & Travel Intelligence Recommendations */}
            <PlanningRecommendations
              activities={weatherData.activities}
              packingAdvice={weatherData.packingAdvice}
              bestTravelDay={weatherData.bestTravelDay}
            />
          </div>
        )}
      </main>

      {/* App Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Weather Intelligence • Open-Meteo Geocoding & Forecast APIs</span>
          </div>
          <div>
            Non-commercial open weather license • Updated dynamically
          </div>
        </div>
      </footer>
    </div>
  );
}
