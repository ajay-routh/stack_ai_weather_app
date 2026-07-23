import React from 'react';
import { Compass, Sparkles, CheckCircle2, AlertCircle, Luggage, CalendarCheck } from 'lucide-react';
import { ActivityRecommendation, DailyForecastItem } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface PlanningRecommendationsProps {
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
}

export const PlanningRecommendations: React.FC<PlanningRecommendationsProps> = ({
  activities,
  packingAdvice,
  bestTravelDay
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4 space-y-6">
      {/* 1. Best Travel / Outing Day Highlight Banner */}
      {bestTravelDay && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-6 border border-indigo-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-40 h-40 text-amber-300" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 flex-none">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Best Day for Outings
                </div>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {bestTravelDay.dayName}, {bestTravelDay.date}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {bestTravelDay.reason} ({bestTravelDay.description})
                </p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-700/60 px-4 py-2.5 rounded-2xl text-center self-start sm:self-auto flex-none">
              <div className="text-xs text-slate-400">Peak Conditions</div>
              <div className="text-sm font-extrabold text-amber-300">
                {bestTravelDay.maxTemp}°C / {bestTravelDay.minTemp}°C
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Activity Suitability Cards Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Compass className="w-5 h-5 text-sky-400" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Outdoor & Travel Intelligence
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => {
            let statusBadgeClass = 'bg-emerald-950 text-emerald-300 border-emerald-800';
            if (act.status === 'Good') statusBadgeClass = 'bg-blue-950 text-blue-300 border-blue-800';
            if (act.status === 'Fair') statusBadgeClass = 'bg-amber-950 text-amber-300 border-amber-800';
            if (act.status === 'Poor' || act.status === 'Caution') statusBadgeClass = 'bg-rose-950 text-rose-300 border-rose-800';

            return (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 text-sky-400">
                        <WeatherIcon name={act.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{act.title}</h4>
                        <span className="text-[11px] text-slate-400">{act.category}</span>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusBadgeClass}`}>
                      {act.status} ({act.score}%)
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {act.summary}
                  </p>
                </div>

                {/* Suitability score bar */}
                <div className="space-y-2 pt-2 border-t border-slate-700/40">
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        act.score >= 80
                          ? 'bg-emerald-400'
                          : act.score >= 60
                          ? 'bg-blue-400'
                          : act.score >= 40
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${act.score}%` }}
                    />
                  </div>

                  {/* Practical tips list */}
                  <div className="space-y-1">
                    {act.tips.map((tip, idx) => (
                      <div key={idx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-sky-400 flex-none" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Smart Packing Advisor */}
      {packingAdvice.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Luggage className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Smart Travel & Packing Recommendations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packingAdvice.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-xs text-slate-200 font-medium flex items-center gap-2.5"
              >
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
