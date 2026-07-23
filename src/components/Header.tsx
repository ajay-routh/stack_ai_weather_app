import React from 'react';
import { CloudSun, RefreshCw, BarChart3, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-[#0A1128]/90 backdrop-blur-md border-b border-[#1E293B] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Tiger Analytics Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5F00] via-[#FF8C00] to-amber-500 p-0.5 shadow-lg shadow-[#FF5F00]/25 flex items-center justify-center">
            <div className="w-full h-full bg-[#0A1128] rounded-[10px] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#FF5F00]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-[#FF5F00] uppercase">
                TIGER ANALYTICS
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#FF5F00]/15 text-orange-400 border border-[#FF5F00]/30 font-semibold hidden sm:inline-block">
                AI & Data
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Weather Intelligence</span>
            </h1>
          </div>
        </div>

        {/* Controls & Unit Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {fetchedAt && (
            <span className="text-xs text-slate-300 hidden md:inline-flex items-center gap-1.5 bg-[#152238] px-2.5 py-1 rounded-full border border-slate-700/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F00] animate-pulse" />
              Updated {fetchedAt}
            </span>
          )}

          {/* Temperature Unit Switcher */}
          <div className="bg-[#152238] p-1 rounded-lg border border-slate-700/80 flex items-center text-xs font-semibold">
            <button
              onClick={() => onToggleTempUnit('celsius')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-gradient-to-r from-[#FF5F00] to-orange-600 text-white shadow-sm font-bold'
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
                  ? 'bg-gradient-to-r from-[#FF5F00] to-orange-600 text-white shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Fahrenheit (°F)"
            >
              °F
            </button>
          </div>

          {/* Speed Unit Switcher */}
          <div className="bg-[#152238] p-1 rounded-lg border border-slate-700/80 hidden sm:flex items-center text-xs font-semibold">
            <button
              onClick={() => onToggleSpeedUnit('kmh')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                speedUnit === 'kmh'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              km/h
            </button>
            <button
              onClick={() => onToggleSpeedUnit('mph')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                speedUnit === 'mph'
                  ? 'bg-slate-700 text-white shadow-sm'
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
            className="p-2 rounded-lg bg-[#152238] border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
            title="Refresh weather data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#FF5F00]' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};

