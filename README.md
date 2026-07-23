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

## Pushing Code to GitHub

1. **Initialize Git (if not already initialized):**
   ```bash
   git init
   git branch -M main
   ```

2. **Stage and Commit Files:**
   ```bash
   git add .
   git commit -m "Initial commit - Weather Intelligence App"
   ```

3. **Create a GitHub Repository:**
   - Go to [GitHub](https://github.com/new) and create a new repository.
   - Leave it empty (without initializing `README`, `.gitignore`, or License).

4. **Link Remote and Push:**
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

## Deployment on Cloudflare Pages

This application is optimized for deployment on **Cloudflare Pages** using direct GitHub integration for automated CI/CD builds.

### Step-by-Step Deployment Instructions

1. **Log in to Cloudflare:**
   - Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.

2. **Create a New Pages Project:**
   - Click **Create application** > select **Pages** tab > click **Connect to Git**.

3. **Connect Your GitHub Account & Select Repository:**
   - Authorize Cloudflare to access your GitHub account.
   - Select your repository (`<your-repo-name>`).

4. **Configure Build Settings:**
   Fill in the build configuration with the following parameters:

   | Setting | Value |
   | :--- | :--- |
   | **Framework Preset** | `Vite` |
   | **Build Command** | `npm run build` |
   | **Build Output Directory** | `dist` |
   | **Root Directory** | *(Leave blank or `/`)* |

   *Optional Environment Variables:*
   - Set `NODE_VERSION` to `18` or `20` under **Environment variables** if needed.

5. **Deploy Project:**
   - Click **Save and Deploy**. Cloudflare Pages will clone the GitHub repository, run `npm run build`, and publish the app to a global CDN URL (e.g., `https://<your-app>.pages.dev`).

### How CI/CD Works with GitHub & Cloudflare Pages

- **Production Deployments**: Any commit pushed or merged into the `main` branch automatically triggers a fresh production build and live update on Cloudflare Pages.
- **Preview Deployments**: Opening a Pull Request in GitHub creates an isolated preview environment with a unique URL for testing changes before merging.

## API References

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast API**: `https://api.open-meteo.com/v1/forecast`

## License

MIT License
