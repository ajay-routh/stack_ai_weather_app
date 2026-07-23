# Weather Intelligence

An interactive weather forecasting and smart planning web application built with **React**, **TypeScript**, **Tailwind CSS**, and the **Open-Meteo API**.

## Features

- 🔍 **Global Location Search**: Search any city worldwide with instant geocoding support.
- 🌡️ **Current Conditions**: Detailed current weather parameters including temperature, feels-like temperature, wind speed/direction, humidity, UV index, and air pressure.
- 📈 **Interactive Charts**: Dynamic temperature trends, precipitation probability, and wind metrics powered by Recharts.
- ⏰ **Hourly & 7-Day Forecasts**: Detailed 24-hour hourly outlook and comprehensive 7-day weather predictions.
- 🧳 **Smart Travel & Packing Recommendations**: Auto-generated packing suggestions and best travel day detection based on upcoming weather metrics.
- ⭐ **Favorites Bar**: Save favorite cities for quick one-click access.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Charts**: Recharts
- **API**: Open-Meteo REST API (Geocoding & Forecast endpoints)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone the repository or open the project folder:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - Starts the Vite development server on port 3000.
- `npm run build` - Builds the application for production deployment.
- `npm run lint` - Runs TypeScript type checker (`tsc --noEmit`).
- `npm run preview` - Previews the production build locally.

## API References

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast API**: `https://api.open-meteo.com/v1/forecast`

## License

MIT License
