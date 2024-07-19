export interface WeatherPostDto {
  city: string;
  latitude: number;
  longitude: number;
  time: string; //Formato ISO 8601: "2024-07-19T10:45:00"
  temperature: number;
  relativeHumidity: number;
  windSpeed: number;
}