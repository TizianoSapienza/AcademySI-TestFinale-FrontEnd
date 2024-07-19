import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherResponse } from '../../../interfaces/weather-Response';
import { WeatherPostDto } from '../../../interfaces/weatherPostDto';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {
  city: string = '';
  displayCity: string = ''; // Variable to store the city name for display
  weatherData: WeatherResponse | null = null;
  error: string | null = null;
  validationError: string | null = null; // Variable for validation error message

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  searchWeather(): void {
    this.weatherService.getWeather(this.city).subscribe({
      next: data => {
        this.weatherData = data;
        this.displayCity = this.city; // Update displayCity only when data is successfully fetched
        this.validationError = null; // Clear any previous validation errors
      },
      error: error => {
        this.weatherData = null;
        this.displayCity = ''; // Clear the displayed city name
        this.validationError = 'Invalid city name or data not available. Please check the city name or try again later.';
        console.error('Error fetching weather data', error);
      }
    });
  }

  saveWeather(): void {
    if (this.weatherData) {
      const weatherPostDto: WeatherPostDto = {
        city: this.displayCity, // Use displayCity here
        latitude: this.weatherData.latitude,
        longitude: this.weatherData.longitude,
        time: this.weatherData.current.time,
        temperature: this.weatherData.current.temperature_2m,
        relativeHumidity: this.weatherData.current.relative_humidity_2m,
        windSpeed: this.weatherData.current.wind_speed_10m
      };

      this.weatherService.saveWeather(weatherPostDto).subscribe({
        next: () => {
          alert('Weather data saved successfully!');
        },
        error: error => {
          this.error = 'Error saving weather data';
          console.error('Error saving weather data', error);
        }
      });
    }
  }
}