export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  icon: string;
}

export interface ForecastDay {
  date: string;
  dayLabel: string;
  high: number;
  low: number;
  icon: string;
  condition: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  fetchedAt: number;
}
