export interface CurrentWeather {
windSpeed: any;
humidity: any;
time: string;
interval: number;
temperature_2m: number;
relative_humidity_2m: number;
wind_speed_10m: number;
}

export interface WeatherResponse {
city: any;
  latitude: number;
  longitude: number;
  current: CurrentWeather;
}