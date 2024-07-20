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

  private getHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  getWeather(city: string): Observable<WeatherResponse> {
    const headers = this.getHeaders();
    return this.http.get<WeatherResponse>(`${this.apiUrl}/weather/current?city=${city}`, { headers });
  }

  saveWeather(weather: WeatherPostDto): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/weather/save`, weather, { headers });
  }
}