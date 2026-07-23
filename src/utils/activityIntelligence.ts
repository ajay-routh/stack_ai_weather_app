import { ActivityRecommendation, CurrentWeatherData, DailyForecastItem, WmoWeatherInfo } from '../types/weather';

export function calculateActivityRecommendations(
  current: CurrentWeatherData,
  wmo: WmoWeatherInfo,
  daily: DailyForecastItem[]
): ActivityRecommendation[] {
  const temp = current.temperature;
  const wind = current.windspeed;
  const precipProb = daily[0]?.precipitationProbabilityMax || 0;
  const uv = current.uvIndex;
  const category = wmo.category;

  // 1. Running & Outdoor Fitness
  let runScore = 80;
  if (temp >= 12 && temp <= 20) runScore += 15;
  else if (temp < 5 || temp > 30) runScore -= 30;
  else if (temp < 10 || temp > 25) runScore -= 15;

  if (wind > 30) runScore -= 25;
  else if (wind > 20) runScore -= 10;

  if (category === 'rain' || category === 'thunderstorm') runScore -= 40;
  else if (category === 'drizzle' || category === 'snow') runScore -= 25;

  if (uv > 7) runScore -= 10;
  runScore = Math.max(10, Math.min(100, runScore));

  // 2. Sightseeing & Photography
  let sightScore = 85;
  if (category === 'clear') sightScore += 15;
  else if (category === 'cloudy') sightScore += 5;
  else if (category === 'fog') sightScore -= 20;
  else if (category === 'rain' || category === 'thunderstorm') sightScore -= 45;

  if (temp < 0 || temp > 36) sightScore -= 25;
  if (precipProb > 50) sightScore -= 20;
  sightScore = Math.max(10, Math.min(100, sightScore));

  // 3. Hiking & Nature Trails
  let hikeScore = 80;
  if (temp >= 10 && temp <= 22) hikeScore += 15;
  else if (temp < 2 || temp > 32) hikeScore -= 30;

  if (category === 'thunderstorm') hikeScore -= 60;
  else if (category === 'rain' || category === 'snow') hikeScore -= 35;
  else if (category === 'fog') hikeScore -= 20;

  if (wind > 35) hikeScore -= 30;
  hikeScore = Math.max(10, Math.min(100, hikeScore));

  // 4. Beach & Outdoor Leisure
  let beachScore = 50;
  if (temp >= 26) beachScore += 35;
  else if (temp >= 22) beachScore += 20;
  else if (temp < 18) beachScore -= 35;

  if (category === 'clear') beachScore += 15;
  else if (category === 'rain' || category === 'thunderstorm' || category === 'snow') beachScore -= 50;

  if (wind > 25) beachScore -= 20;
  beachScore = Math.max(10, Math.min(100, beachScore));

  // 5. Road Trip & Driving Safety
  let driveScore = 90;
  if (category === 'thunderstorm') driveScore -= 40;
  else if (category === 'snow' || category === 'fog') driveScore -= 30;
  else if (category === 'rain') driveScore -= 20;

  if (wind > 45) driveScore -= 25;
  if (temp <= 0) driveScore -= 15; // Black ice caution
  driveScore = Math.max(10, Math.min(100, driveScore));

  // 6. Stargazing & Night Sky
  let starScore = 70;
  if (category === 'clear') starScore += 30;
  else if (category === 'cloudy' || category === 'fog') starScore -= 40;
  else if (category === 'rain' || category === 'thunderstorm') starScore -= 60;
  starScore = Math.max(10, Math.min(100, starScore));

  function getStatus(score: number): 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Caution' {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 35) return 'Poor';
    return 'Caution';
  }

  return [
    {
      id: 'running',
      title: 'Running & Outdoor Fitness',
      category: 'Fitness',
      score: runScore,
      status: getStatus(runScore),
      summary: runScore >= 70 ? 'Ideal temperature and wind conditions for outdoor workouts.' : 'Sub-optimal weather for outdoor cardio. Consider indoor alternatives.',
      iconName: 'Activity',
      tips: [
        temp < 10 ? 'Wear thermal activewear layers' : 'Stay hydrated and wear breathable gear',
        wind > 20 ? 'Expect headwinds on exposed routes' : 'Low wind factor',
        uv >= 6 ? 'Apply SPF 30+ sunscreen' : 'UV index is manageable'
      ]
    },
    {
      id: 'sightseeing',
      title: 'Sightseeing & Photography',
      category: 'Travel',
      score: sightScore,
      status: getStatus(sightScore),
      summary: sightScore >= 70 ? 'Great lighting and comfortable climate for city tours and photography.' : 'Overcast or precipitation may hinder outdoor landmark viewing.',
      iconName: 'Camera',
      tips: [
        category === 'clear' ? 'Golden hour light will be crisp' : 'Cloud cover provides diffused lighting',
        precipProb > 30 ? 'Keep a compact rain jacket handy' : 'Minimal rain risk during day tours'
      ]
    },
    {
      id: 'hiking',
      title: 'Hiking & Nature Trails',
      category: 'Outdoors',
      score: hikeScore,
      status: getStatus(hikeScore),
      summary: hikeScore >= 70 ? 'Trail stability and ambient temperature are very favorable.' : 'Slippery paths, high wind, or rain risk detected on mountain routes.',
      iconName: 'Mountain',
      tips: [
        temp <= 5 ? 'Trail ground may be icy or frozen' : 'Comfortable ambient trekking temperatures',
        wind > 25 ? 'Caution on ridge lines due to gusty winds' : 'Calm trail conditions'
      ]
    },
    {
      id: 'beach',
      title: 'Beach & Swimming',
      category: 'Leisure',
      score: beachScore,
      status: getStatus(beachScore),
      summary: beachScore >= 70 ? 'Warm temperatures and sunshine perfect for watersports.' : 'Cooler temperatures or cloud cover make beach outings less ideal.',
      iconName: 'SunMedium',
      tips: [
        uv >= 6 ? 'High UV rating — bring broad-spectrum sunscreen' : 'Moderate sun intensity',
        temp >= 24 ? 'Water and outdoor air feel warm' : 'Consider a light jacket or neoprene top'
      ]
    },
    {
      id: 'driving',
      title: 'Road Trip & Driving Safety',
      category: 'Safety',
      score: driveScore,
      status: getStatus(driveScore),
      summary: driveScore >= 80 ? 'Clear roadways and high visibility expected.' : 'Adverse weather conditions affect road grip and visibility.',
      iconName: 'Car',
      tips: [
        category === 'fog' ? 'Use fog lights and increase braking distance' : 'Standard highway conditions',
        temp <= 0 ? 'Be mindful of potential black ice on bridges' : 'Dry or normal road friction'
      ]
    },
    {
      id: 'stargazing',
      title: 'Stargazing & Astronomy',
      category: 'Night',
      score: starScore,
      status: getStatus(starScore),
      summary: starScore >= 70 ? 'Low cloud density provides great nocturnal sky visibility.' : 'Clouds or precipitation obstruct celestial views tonight.',
      iconName: 'Sparkles',
      tips: [
        category === 'clear' ? 'Clear atmospheric window' : 'Heavy cloud deck will obscure stars',
        'Check moonlight phase for deep-sky observation'
      ]
    }
  ];
}

export function generatePackingAdvice(
  current: CurrentWeatherData,
  daily: DailyForecastItem[]
): string[] {
  const advice: string[] = [];
  const temp = current.temperature;
  const maxTempWeek = Math.max(...daily.map(d => d.maxTemp));
  const minTempWeek = Math.min(...daily.map(d => d.minTemp));
  const maxRainProb = Math.max(...daily.map(d => d.precipitationProbabilityMax));
  const maxUv = Math.max(...daily.map(d => d.uvIndexMax));

  if (maxRainProb > 40) {
    advice.push('🌧️ Waterproof jacket or sturdy compact umbrella (High rain probability this week)');
  }

  if (minTempWeek < 5) {
    advice.push('🧥 Heavy insulated coat, scarf, and warm gloves for chilly mornings');
  } else if (minTempWeek < 15) {
    advice.push('🧥 Light sweater, fleece jacket, or trench coat for layered warmth');
  }

  if (maxTempWeek > 25) {
    advice.push('👕 Breathable linen or cotton tops, shorts, and light summer gear');
  }

  if (maxUv >= 6) {
    advice.push('🕶️ Polarized sunglasses, wide-brim hat, and SPF 50+ sunscreen');
  }

  if (current.windspeed > 25) {
    advice.push('💨 Windbreaker or wind-resistant outer shell');
  }

  if (advice.length < 3) {
    advice.push('👟 Comfortable walking shoes for day explorations');
    advice.push('💧 Reusable water bottle to stay hydrated');
  }

  return advice;
}

export function findBestTravelDay(daily: DailyForecastItem[]) {
  if (!daily || daily.length === 0) return null;

  let bestDay = daily[0];
  let highestScore = -1;

  daily.forEach(day => {
    let score = 50;
    // Temperature sweet spot 18°C - 26°C
    if (day.maxTemp >= 18 && day.maxTemp <= 26) score += 30;
    else if (day.maxTemp >= 12 && day.maxTemp <= 30) score += 15;

    // Low rain bonus
    if (day.precipitationProbabilityMax < 15) score += 30;
    else if (day.precipitationProbabilityMax < 35) score += 10;
    else score -= 30;

    // Weather code bonus
    if (day.weatherInfo.category === 'clear') score += 20;
    else if (day.weatherInfo.category === 'cloudy') score += 5;
    else score -= 25;

    if (score > highestScore) {
      highestScore = score;
      bestDay = day;
    }
  });

  return {
    dayName: bestDay.dayName,
    date: bestDay.fullDateFormatted,
    maxTemp: bestDay.maxTemp,
    minTemp: bestDay.minTemp,
    description: bestDay.weatherInfo.description,
    reason: `Highest composite score (${highestScore}/100) with low precipitation risk (${bestDay.precipitationProbabilityMax}%) and comfortable max temp.`
  };
}
