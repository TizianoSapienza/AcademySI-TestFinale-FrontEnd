import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../interfaces/weather-Response';
import { WeatherPostDto } from '../interfaces/weatherPostDto';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.apiUrl}/weather/current?city=${city}`);
  }

  saveWeather(weather: WeatherPostDto): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${environment.apiUrl}/weather/save`, weather, { headers });
  }
}
