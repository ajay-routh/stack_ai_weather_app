import { WmoWeatherInfo } from '../types/weather';

export const WMO_CODES: Record<number, WmoWeatherInfo> = {
  0: {
    code: 0,
    description: 'Clear Sky',
    iconName: 'Sun',
    bgGradient: 'from-amber-400 via-orange-400 to-amber-600',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300',
    category: 'clear'
  },
  1: {
    code: 1,
    description: 'Mainly Clear',
    iconName: 'SunDim',
    bgGradient: 'from-sky-400 via-blue-500 to-amber-500',
    badgeBg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300',
    category: 'clear'
  },
  2: {
    code: 2,
    description: 'Partly Cloudy',
    iconName: 'CloudSun',
    bgGradient: 'from-blue-400 via-indigo-400 to-sky-500',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'cloudy'
  },
  3: {
    code: 3,
    description: 'Overcast',
    iconName: 'Cloud',
    bgGradient: 'from-slate-400 via-gray-500 to-slate-600',
    badgeBg: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
    category: 'cloudy'
  },
  45: {
    code: 45,
    description: 'Foggy',
    iconName: 'CloudFog',
    bgGradient: 'from-slate-400 via-zinc-500 to-stone-600',
    badgeBg: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    category: 'fog'
  },
  48: {
    code: 48,
    description: 'Depositing Rime Fog',
    iconName: 'CloudFog',
    bgGradient: 'from-zinc-400 via-slate-500 to-gray-700',
    badgeBg: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
    category: 'fog'
  },
  51: {
    code: 51,
    description: 'Light Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-cyan-500 via-teal-600 to-blue-600',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300',
    category: 'drizzle'
  },
  53: {
    code: 53,
    description: 'Moderate Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-cyan-600 via-blue-600 to-teal-700',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300',
    category: 'drizzle'
  },
  55: {
    code: 55,
    description: 'Dense Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-cyan-700 via-blue-700 to-slate-700',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300',
    category: 'drizzle'
  },
  56: {
    code: 56,
    description: 'Light Freezing Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-blue-600 via-indigo-600 to-cyan-800',
    badgeBg: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
    category: 'drizzle'
  },
  57: {
    code: 57,
    description: 'Dense Freezing Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-indigo-700 via-cyan-800 to-slate-800',
    badgeBg: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
    category: 'drizzle'
  },
  61: {
    code: 61,
    description: 'Slight Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-500 via-indigo-600 to-sky-700',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'rain'
  },
  63: {
    code: 63,
    description: 'Moderate Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-600 via-sky-700 to-indigo-800',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'rain'
  },
  65: {
    code: 65,
    description: 'Heavy Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-indigo-700 via-blue-800 to-slate-900',
    badgeBg: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200',
    category: 'rain'
  },
  66: {
    code: 66,
    description: 'Light Freezing Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-700 via-cyan-800 to-indigo-900',
    badgeBg: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200',
    category: 'rain'
  },
  67: {
    code: 67,
    description: 'Heavy Freezing Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-indigo-800 via-blue-900 to-slate-900',
    badgeBg: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200',
    category: 'rain'
  },
  71: {
    code: 71,
    description: 'Slight Snow Fall',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-300 via-indigo-400 to-blue-500',
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
    category: 'snow'
  },
  73: {
    code: 73,
    description: 'Moderate Snow Fall',
    iconName: 'Snowflake',
    bgGradient: 'from-blue-400 via-indigo-500 to-sky-600',
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
    category: 'snow'
  },
  75: {
    code: 75,
    description: 'Heavy Snow Fall',
    iconName: 'Snowflake',
    bgGradient: 'from-indigo-600 via-blue-700 to-slate-800',
    badgeBg: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200',
    category: 'snow'
  },
  77: {
    code: 77,
    description: 'Snow Grains',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-400 via-indigo-400 to-blue-600',
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
    category: 'snow'
  },
  80: {
    code: 80,
    description: 'Slight Rain Showers',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-400 via-sky-500 to-teal-600',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'rain'
  },
  81: {
    code: 81,
    description: 'Moderate Rain Showers',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-500 via-indigo-600 to-sky-700',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'rain'
  },
  82: {
    code: 82,
    description: 'Violent Rain Showers',
    iconName: 'CloudRain',
    bgGradient: 'from-indigo-700 via-blue-800 to-purple-900',
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200',
    category: 'rain'
  },
  85: {
    code: 85,
    description: 'Slight Snow Showers',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-400 via-indigo-500 to-blue-600',
    badgeBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200',
    category: 'snow'
  },
  86: {
    code: 86,
    description: 'Heavy Snow Showers',
    iconName: 'Snowflake',
    bgGradient: 'from-indigo-600 via-blue-800 to-slate-900',
    badgeBg: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200',
    category: 'snow'
  },
  95: {
    code: 95,
    description: 'Thunderstorm',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-700 via-indigo-800 to-slate-950',
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200',
    category: 'thunderstorm'
  },
  96: {
    code: 96,
    description: 'Thunderstorm with Light Hail',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-800 via-violet-900 to-slate-950',
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200',
    category: 'thunderstorm'
  },
  99: {
    code: 99,
    description: 'Thunderstorm with Heavy Hail',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-900 via-slate-900 to-black',
    badgeBg: 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200',
    category: 'thunderstorm'
  }
};

export function getWmoInfo(code: number): WmoWeatherInfo {
  if (WMO_CODES[code]) {
    return WMO_CODES[code];
  }
  return {
    code,
    description: 'Weather Condition',
    iconName: 'Cloud',
    bgGradient: 'from-blue-500 via-indigo-600 to-slate-700',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300',
    category: 'cloudy'
  };
}
