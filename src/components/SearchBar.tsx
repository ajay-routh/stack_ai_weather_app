import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, X, Loader2, Globe } from 'lucide-react';
import { CityLocation } from '../types/weather';
import { searchCities, DEFAULT_CITIES } from '../services/weatherService';

interface SearchBarProps {
  onSelectLocation: (location: CityLocation) => void;
  selectedLocation?: CityLocation;
  isLoadingWeather?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectLocation,
  selectedLocation,
  isLoadingWeather
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search for city suggestions
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowDropdown(true);
      } catch (err) {
        console.error('Auto-suggest error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: CityLocation) => {
    setQuery('');
    setShowDropdown(false);
    setSuggestions([]);
    setLocationError(null);
    onSelectLocation(city);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else if (query.trim().length >= 2) {
      // Direct search trigger
      setIsSearching(true);
      searchCities(query).then(results => {
        setIsSearching(false);
        if (results.length > 0) {
          handleSelect(results[0]);
        } else {
          setLocationError(`No city matching "${query}" was found. Please try another search.`);
        }
      }).catch(() => {
        setIsSearching(false);
        setLocationError('Failed to search city. Please check connection.');
      });
    }
  };

  const handleUseMyLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt to find city name from Open-Meteo or create custom location
          const myCity: CityLocation = {
            id: Date.now(),
            name: 'Current Location',
            latitude,
            longitude,
            country: 'Local Device GPS',
            admin1: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`
          };
          onSelectLocation(myCity);
        } catch (err) {
          console.error(err);
          setLocationError('Unable to process location data.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location access was denied. Please allow location permissions or search for your city.');
        } else {
          setLocationError('Could not determine current position. Please search for a city.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      <div ref={searchContainerRef} className="relative z-20">
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            {isSearching || isLoadingWeather ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#FF5F00]" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLocationError(null);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            placeholder="Search city, region, or country (e.g. London, Tokyo, Miami)..."
            className="w-full pl-12 pr-28 py-3.5 bg-[#152238]/90 hover:bg-[#152238] focus:bg-[#0A1128] border border-slate-700/80 focus:border-[#FF5F00] text-white placeholder-slate-400 rounded-2xl shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5F00]/20 text-sm sm:text-base"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="absolute right-24 p-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search trigger button */}
          <button
            type="submit"
            className="absolute right-2.5 px-4 py-2 bg-gradient-to-r from-[#FF5F00] to-orange-600 hover:from-orange-500 hover:to-[#FF5F00] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5"
          >
            Search
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
            {suggestions.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => handleSelect(city)}
                className="w-full px-4 py-3 text-left hover:bg-slate-800/90 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {city.name}
                      {city.admin1 && (
                        <span className="text-xs font-normal text-slate-400">
                          , {city.admin1}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Globe className="w-3 h-3 text-slate-500" />
                      {city.country}
                      {city.population && (
                        <span className="text-slate-500 ml-2">
                          Pop. {(city.population / 1000).toFixed(0)}k
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors font-mono">
                  {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Geolocation Button & Preset Quick Chips */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Use My Location Button */}
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-sky-400 hover:text-sky-300 font-medium rounded-xl transition-all shadow-sm disabled:opacity-50"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
          ) : (
            <Navigation className="w-3.5 h-3.5" />
          )}
          <span>{isLocating ? 'Locating GPS...' : 'Use My Location'}</span>
        </button>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
          <span className="text-slate-400 hidden sm:inline mr-1 font-medium">Popular:</span>
          {DEFAULT_CITIES.slice(0, 5).map((preset) => {
            const isCurrent = selectedLocation?.name.toLowerCase() === preset.name.toLowerCase();
            return (
              <button
                key={preset.id}
                onClick={() => onSelectLocation(preset)}
                className={`px-2.5 py-1 rounded-lg border text-xs whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#FF5F00]/25 border-[#FF5F00] text-orange-200 font-semibold shadow-sm'
                    : 'bg-[#152238]/80 border-slate-700/60 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location / Search Error Message */}
      {locationError && (
        <div className="mt-3 p-3 bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs rounded-xl flex items-center justify-between">
          <span>{locationError}</span>
          <button
            onClick={() => setLocationError(null)}
            className="text-rose-400 hover:text-rose-100 ml-2 font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
