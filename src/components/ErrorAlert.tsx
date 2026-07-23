import React from 'react';
import { AlertTriangle, RefreshCw, MapPin } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onRetry: () => void;
  onResetDefault: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  onResetDefault
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-12 px-4">
      <div className="bg-rose-950/80 border border-rose-800/80 rounded-3xl p-6 sm:p-8 text-rose-100 shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-900/80 border border-rose-700/60 flex items-center justify-center text-rose-300">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Unable to Load Weather Data
          </h3>
          <p className="text-xs sm:text-sm text-rose-200 mt-2 max-w-lg mx-auto leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onResetDefault}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Switch to Default (London)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
