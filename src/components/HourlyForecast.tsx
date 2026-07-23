import React from 'react';
import { Clock, Droplets } from 'lucide-react';
import { HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { formatTemp } from '../utils/formatters';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, tempUnit }) => {
  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="bg-[#152238]/90 border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF5F00]" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              24-Hour Timeline
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">Hourly forecast</span>
        </div>

        {/* Scrollable hourly track */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
          {hourly.map((item, index) => {
            const isNow = index === 0;
            return (
              <div
                key={item.time}
                className={`flex-none w-24 p-3.5 rounded-2xl flex flex-col items-center justify-between text-center transition-all border ${
                  isNow
                    ? 'bg-[#FF5F00]/20 border-[#FF5F00] text-white shadow-md shadow-[#FF5F00]/15 font-semibold'
                    : 'bg-[#0A1128]/70 border-slate-700/50 hover:bg-[#0A1128] text-slate-200'
                }`}
              >
                <div className={`text-xs font-semibold mb-2 ${isNow ? 'text-[#FF5F00]' : 'text-slate-300'}`}>
                  {isNow ? 'Now' : item.hourLabel}
                </div>

                <div className="my-2 p-2 rounded-xl bg-[#152238]">
                  <WeatherIcon name={item.weatherInfo.iconName} className={`w-6 h-6 ${isNow ? 'text-[#FF5F00]' : 'text-sky-400'}`} />
                </div>

                <div className="text-base font-bold text-white my-1">
                  {formatTemp(item.temp, tempUnit)}
                </div>

                {/* Rain probability pill */}
                <div
                  className={`mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    item.precipProb > 30
                      ? 'bg-blue-950 text-blue-300 border border-blue-800'
                      : 'text-slate-400'
                  }`}
                >
                  <Droplets className="w-3 h-3 text-sky-400" />
                  <span>{item.precipProb}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
