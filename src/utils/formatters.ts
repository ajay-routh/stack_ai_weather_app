import { TemperatureUnit, SpeedUnit } from '../types/weather';

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  if (unit === 'fahrenheit') {
    return `${celsiusToFahrenheit(celsius)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function kmhToMph(kmh: number): number {
  return Math.round(kmh * 0.621371);
}

export function formatWindSpeed(kmh: number, unit: SpeedUnit): string {
  if (unit === 'mph') {
    return `${kmhToMph(kmh)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}

export function getWindDirectionCardinal(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}

export function formatHour(timeStr: string): string {
  try {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch {
    return timeStr;
  }
}

export function formatDayName(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    const todayStr = new Date().toISOString().split('T')[0];
    if (dateStr === todayStr) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function getUvCategory(uv: number): { label: string; colorClass: string; bgClass: string } {
  if (uv <= 2) {
    return { label: 'Low', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500' };
  } else if (uv <= 5) {
    return { label: 'Moderate', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500' };
  } else if (uv <= 7) {
    return { label: 'High', colorClass: 'text-orange-600 dark:text-orange-400', bgClass: 'bg-orange-500' };
  } else if (uv <= 10) {
    return { label: 'Very High', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500' };
  } else {
    return { label: 'Extreme', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-purple-600' };
  }
}

export function getHumidityCategory(humidity: number): string {
  if (humidity < 30) return 'Dry & Crisp';
  if (humidity <= 60) return 'Comfortable';
  if (humidity <= 80) return 'Humid';
  return 'Very Humid';
}
