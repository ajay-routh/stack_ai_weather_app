import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ComposedChart,
  Line
} from 'recharts';
import { TrendingUp, CloudRain } from 'lucide-react';
import { DailyForecastItem, HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { celsiusToFahrenheit } from '../utils/formatters';

interface WeatherChartsProps {
  daily: DailyForecastItem[];
  hourly: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
}

export const WeatherCharts: React.FC<WeatherChartsProps> = ({
  daily,
  hourly,
  tempUnit
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'hourly'>('daily');

  if (!daily || daily.length === 0) return null;

  // Format daily data for recharts
  const dailyChartData = daily.map((day) => ({
    name: day.dayName,
    maxTemp: tempUnit === 'fahrenheit' ? celsiusToFahrenheit(day.maxTemp) : Math.round(day.maxTemp),
    minTemp: tempUnit === 'fahrenheit' ? celsiusToFahrenheit(day.minTemp) : Math.round(day.minTemp),
    precipProb: day.precipitationProbabilityMax,
    condition: day.weatherInfo.description
  }));

  // Format hourly data for recharts (24 hours)
  const hourlyChartData = hourly.slice(0, 24).map((h) => ({
    time: h.hourLabel,
    temp: tempUnit === 'fahrenheit' ? celsiusToFahrenheit(h.temp) : Math.round(h.temp),
    precipProb: h.precipProb,
    condition: h.weatherInfo.description
  }));

  const unitLabel = tempUnit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        {/* Header & Chart Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Visual Temperature & Rain Analytics
            </h3>
          </div>

          <div className="bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold self-start sm:self-auto border border-slate-700/60">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'daily'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>7-Day Trend</span>
            </button>
            <button
              onClick={() => setActiveTab('hourly')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'hourly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>24h Rain & Temp</span>
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'daily' ? (
              <AreaChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="maxTempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="minTempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit={unitLabel} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                          <div className="font-bold text-white border-b border-slate-800 pb-1">
                            {label} ({data.condition})
                          </div>
                          <div className="text-amber-400 font-semibold">
                            Max Temp: {data.maxTemp}{unitLabel}
                          </div>
                          <div className="text-blue-400 font-semibold">
                            Min Temp: {data.minTemp}{unitLabel}
                          </div>
                          <div className="text-sky-300">
                            Precip Probability: {data.precipProb}%
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="maxTemp"
                  name="Max Temp"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#maxTempGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="minTemp"
                  name="Min Temp"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#minTempGrad)"
                />
              </AreaChart>
            ) : (
              <ComposedChart data={hourlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="temp" stroke="#f59e0b" fontSize={11} tickLine={false} unit={unitLabel} />
                <YAxis yAxisId="rain" orientation="right" stroke="#38bdf8" fontSize={11} tickLine={false} unit="%" domain={[0, 100]} />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1">
                          <div className="font-bold text-white border-b border-slate-800 pb-1">
                            {label} — {data.condition}
                          </div>
                          <div className="text-amber-400 font-semibold">
                            Temperature: {data.temp}{unitLabel}
                          </div>
                          <div className="text-sky-300 font-semibold">
                            Rain Chance: {data.precipProb}%
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Bar yAxisId="rain" dataKey="precipProb" name="Rain Chance %" fill="#0284c7" opacity={0.6} radius={[4, 4, 0, 0]} />
                <Line yAxisId="temp" type="monotone" dataKey="temp" name="Temperature" stroke="#f59e0b" strokeWidth={3} dot={{ r: 2 }} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
