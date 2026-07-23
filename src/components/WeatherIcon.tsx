import React from 'react';
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Camera,
  Mountain,
  Car,
  Sparkles,
  Activity,
  SunMedium,
  Umbrella,
  CheckCircle2,
  AlertTriangle,
  Info,
  MapPin,
  Search,
  Star,
  RefreshCw,
  Navigation,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Sun':
      return <Sun className={className} />;
    case 'SunDim':
      return <SunDim className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Thermometer':
      return <Thermometer className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Gauge':
      return <Gauge className={className} />;
    case 'Sunrise':
      return <Sunrise className={className} />;
    case 'Sunset':
      return <Sunset className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Mountain':
      return <Mountain className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'SunMedium':
      return <SunMedium className={className} />;
    case 'Umbrella':
      return <Umbrella className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'Search':
      return <Search className={className} />;
    case 'Star':
      return <Star className={className} />;
    case 'RefreshCw':
      return <RefreshCw className={className} />;
    case 'Navigation':
      return <Navigation className={className} />;
    case 'ChevronRight':
      return <ChevronRight className={className} />;
    case 'ChevronDown':
      return <ChevronDown className={className} />;
    default:
      return <Cloud className={className} />;
  }
};
