import React from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { TemperatureUnit, SpeedUnit } from '../types/weather';

interface HeaderProps {
  tempUnit: TemperatureUnit;
  onToggleTempUnit: (unit: TemperatureUnit) => void;
  speedUnit: SpeedUnit;
  onToggleSpeedUnit: (unit: SpeedUnit) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  fetchedAt?: string;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  tempUnit,
  onToggleTempUnit,
  speedUnit,
  onToggleSpeedUnit,
  onRefresh,
  isRefreshing,
  fetchedAt,
  favoritesCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-0.5 shadow-md shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <CloudSun className="w-6 h-6 text-sky-400" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent tracking-tight">
              Weather Intelligence
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Open-Meteo High-Precision Forecasts
            </p>
          </div>
        </div>

        {/* Controls & Unit Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {fetchedAt && (
            <span className="text-xs text-slate-400 hidden md:inline-flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-full border border-slate-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Updated {fetchedAt}
            </span>
          )}

          {/* Temperature Unit Switcher */}
          <div className="bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 flex items-center text-xs font-semibold">
            <button
              onClick={() => onToggleTempUnit('celsius')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Celsius (°C)"
            >
              °C
            </button>
            <button
              onClick={() => onToggleTempUnit('fahrenheit')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                tempUnit === 'fahrenheit'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Fahrenheit (°F)"
            >
              °F
            </button>
          </div>

          {/* Speed Unit Switcher */}
          <div className="bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 hidden sm:flex items-center text-xs font-semibold">
            <button
              onClick={() => onToggleSpeedUnit('kmh')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                speedUnit === 'kmh'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              km/h
            </button>
            <button
              onClick={() => onToggleSpeedUnit('mph')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                speedUnit === 'mph'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              mph
            </button>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
            title="Refresh weather data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
