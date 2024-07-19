export interface WeatherPostDto {
  city: string;
  latitude: number;
  longitude: number;
  time: string;
  temperature: number;
  relativeHumidity: number;
  windSpeed: number;
}