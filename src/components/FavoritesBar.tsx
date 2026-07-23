import React from 'react';
import { Star, Trash2, MapPin } from 'lucide-react';
import { CityLocation } from '../types/weather';

interface FavoritesBarProps {
  favorites: CityLocation[];
  onSelectCity: (city: CityLocation) => void;
  onRemoveFavorite: (cityId: number) => void;
  currentCityId?: number;
}

export const FavoritesBar: React.FC<FavoritesBarProps> = ({
  favorites,
  onSelectCity,
  onRemoveFavorite,
  currentCityId
}) => {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 px-4">
      <div className="bg-[#152238]/80 border border-slate-700/80 rounded-2xl p-3.5 flex items-center gap-3 shadow-lg">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5F00] flex-none pr-2 border-r border-slate-700/80">
          <Star className="w-4 h-4 fill-[#FF5F00] text-[#FF5F00]" />
          <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Saved Cities</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {favorites.map((city) => {
            const isSelected = city.id === currentCityId;
            return (
              <div
                key={city.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex-none ${
                  isSelected
                    ? 'bg-[#FF5F00]/20 border-[#FF5F00] text-white shadow-sm font-semibold'
                    : 'bg-[#0A1128]/80 border-slate-700/60 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                <button
                  onClick={() => onSelectCity(city)}
                  className="flex items-center gap-1 hover:underline"
                >
                  <MapPin className="w-3 h-3 text-[#FF5F00]" />
                  <span>{city.name}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(city.id);
                  }}
                  className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors ml-1"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
