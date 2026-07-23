import React from 'react';
import {
  MapPin,
  Star,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  Sunrise,
  Sunset,
  Eye,
  Gauge
} from 'lucide-react';
import { WeatherData, TemperatureUnit, SpeedUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import {
  formatTemp,
  formatWindSpeed,
  getWindDirectionCardinal,
  getUvCategory,
  getHumidityCategory
} from '../utils/formatters';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  tempUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  tempUnit,
  speedUnit,
  isFavorite,
  onToggleFavorite
}) => {
  const { location, current, currentWmo, daily } = weather;
  const todayForecast = daily[0];

  const uvInfo = getUvCategory(current.uvIndex);
  const humidityStatus = getHumidityCategory(current.relativeHumidity);
  const windCardinal = getWindDirectionCardinal(current.winddirection);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${currentWmo.bgGradient} p-6 sm:p-8 text-white shadow-2xl transition-all duration-500 border border-white/10`}>
        {/* Subtle background glow effect */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Location Bar & Favorite Star */}
        <div className="flex items-start justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[10px] font-bold text-orange-300 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F00]" />
              Tiger Analytics Intelligence
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white/90 animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-sm">
                {location.name}
              </h2>
            </div>
            <p className="text-sm text-white/80 font-medium mt-0.5 ml-7">
              {location.admin1 ? `${location.admin1}, ` : ''}{location.country}
            </p>
          </div>

          <button
            onClick={onToggleFavorite}
            className={`p-3 rounded-2xl backdrop-blur-md border transition-all ${
              isFavorite
                ? 'bg-[#FF5F00] text-white border-orange-400 shadow-lg shadow-[#FF5F00]/40'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Main Temperature & Weather Condition Hero Row */}
        <div className="my-6 sm:my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-black tracking-tight drop-shadow-md">
                {formatTemp(current.temperature, tempUnit)}
              </span>
              <div className="text-sm sm:text-base font-semibold text-white/90">
                <div>Feels like {formatTemp(current.apparentTemperature, tempUnit)}</div>
                {todayForecast && (
                  <div className="text-xs text-white/70 font-normal mt-0.5">
                    H: {formatTemp(todayForecast.maxTemp, tempUnit)} • L: {formatTemp(todayForecast.minTemp, tempUnit)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 self-start sm:self-auto">
            <WeatherIcon name={currentWmo.iconName} className="w-12 h-12 text-white drop-shadow-md" />
            <div>
              <div className="text-lg font-bold drop-shadow-sm">{currentWmo.description}</div>
              <div className="text-xs text-white/80">WMO Code {current.weathercode}</div>
            </div>
          </div>
        </div>

        {/* Secondary Weather Indicator Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/20 relative z-10 text-xs sm:text-sm">
          {/* Wind Indicator */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-white/70 font-medium mb-1">
              <Wind className="w-4 h-4 text-sky-300" />
              <span>Wind Speed</span>
            </div>
            <div className="text-base font-bold">
              {formatWindSpeed(current.windspeed, speedUnit)}
            </div>
            <div className="text-xs text-white/80 mt-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-sky-200" style={{ transform: `rotate(${current.winddirection}deg)` }} />
              <span>{windCardinal} ({current.winddirection}°)</span>
            </div>
          </div>

          {/* Humidity Indicator */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-white/70 font-medium mb-1">
              <Droplets className="w-4 h-4 text-blue-300" />
              <span>Humidity</span>
            </div>
            <div className="text-base font-bold">{current.relativeHumidity}%</div>
            <div className="text-xs text-white/80 mt-1">{humidityStatus}</div>
          </div>

          {/* UV Index Indicator */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-white/70 font-medium mb-1">
              <Thermometer className="w-4 h-4 text-amber-300" />
              <span>UV Index</span>
            </div>
            <div className="text-base font-bold flex items-center gap-2">
              <span>{current.uvIndex.toFixed(1)}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold text-white ${uvInfo.bgClass}`}>
                {uvInfo.label}
              </span>
            </div>
            <div className="text-xs text-white/80 mt-1">
              {todayForecast ? `Max ${todayForecast.uvIndexMax.toFixed(1)}` : 'Sun Safety'}
            </div>
          </div>

          {/* Sun Times */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-white/70 font-medium mb-1">
              <Sunrise className="w-4 h-4 text-amber-200" />
              <span>Sun Cycle</span>
            </div>
            <div className="text-xs font-semibold text-white space-y-1 mt-0.5">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Rise</span>
                <span>{todayForecast?.sunrise || '--'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Set</span>
                <span>{todayForecast?.sunset || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
