import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Droplets, Wind, Sunrise, Sunset, Sun } from 'lucide-react';
import { DailyForecastItem, TemperatureUnit, SpeedUnit } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { formatTemp, formatWindSpeed } from '../utils/formatters';

interface SevenDayForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TemperatureUnit;
  speedUnit: SpeedUnit;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({
  daily,
  tempUnit,
  speedUnit
}) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  if (!daily || daily.length === 0) return null;

  // Calculate min and max temperatures across the 7 days for relative bar width
  const minWeekTemp = Math.min(...daily.map((d) => d.minTemp));
  const maxWeekTemp = Math.max(...daily.map((d) => d.maxTemp));
  const tempRange = Math.max(1, maxWeekTemp - minWeekTemp);

  const toggleExpand = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              7-Day Weather Outlook
            </h3>
          </div>
          <span className="text-xs text-slate-400">Tap day for detailed breakdown</span>
        </div>

        <div className="space-y-3">
          {daily.map((day) => {
            const isExpanded = expandedDay === day.date;
            const leftOffsetPercent = Math.max(
              0,
              ((day.minTemp - minWeekTemp) / tempRange) * 100
            );
            const barWidthPercent = Math.max(
              8,
              ((day.maxTemp - day.minTemp) / tempRange) * 100
            );

            return (
              <div
                key={day.date}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-2xl transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(day.date)}
                  className="w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
                >
                  {/* Day & Icon */}
                  <div className="flex items-center gap-3 min-w-[160px]">
                    <div className="p-2 rounded-xl bg-slate-800 text-sky-400 flex-none">
                      <WeatherIcon name={day.weatherInfo.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{day.dayName}</span>
                        <span className="text-xs font-normal text-slate-400">
                          {day.fullDateFormatted}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">
                        {day.weatherInfo.description}
                      </div>
                    </div>
                  </div>

                  {/* Precipitation Badge & Wind */}
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <Droplets className="w-3.5 h-3.5 text-sky-400" />
                      <span>{day.precipitationProbabilityMax}%</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 min-w-[80px]">
                      <Wind className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatWindSpeed(day.maxWindSpeed, speedUnit)}</span>
                    </div>
                  </div>

                  {/* Temperature Range Bar */}
                  <div className="flex items-center gap-3 min-w-[200px] flex-1">
                    <span className="text-xs font-semibold text-slate-400 w-10 text-right">
                      {formatTemp(day.minTemp, tempUnit)}
                    </span>

                    {/* Relative range track */}
                    <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden relative">
                      <div
                        className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400"
                        style={{
                          left: `${leftOffsetPercent}%`,
                          width: `${barWidthPercent}%`
                        }}
                      />
                    </div>

                    <span className="text-xs font-bold text-white w-10 text-left">
                      {formatTemp(day.maxTemp, tempUnit)}
                    </span>
                  </div>

                  <div className="text-slate-500 hover:text-slate-300">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-700/40 bg-slate-900/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-slate-400 flex items-center gap-1 mb-1">
                        <Droplets className="w-3.5 h-3.5 text-sky-400" />
                        <span>Total Rain</span>
                      </div>
                      <div className="font-semibold text-white">
                        {day.precipitationSum.toFixed(1)} mm
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-slate-400 flex items-center gap-1 mb-1">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>UV Max</span>
                      </div>
                      <div className="font-semibold text-white">
                        Index {day.uvIndexMax.toFixed(1)}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-slate-400 flex items-center gap-1 mb-1">
                        <Sunrise className="w-3.5 h-3.5 text-amber-300" />
                        <span>Sunrise</span>
                      </div>
                      <div className="font-semibold text-white">{day.sunrise}</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50">
                      <div className="text-slate-400 flex items-center gap-1 mb-1">
                        <Sunset className="w-3.5 h-3.5 text-amber-500" />
                        <span>Sunset</span>
                      </div>
                      <div className="font-semibold text-white">{day.sunset}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
