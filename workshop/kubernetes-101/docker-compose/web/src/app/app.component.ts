import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DemoWeb';
  forecast: [];
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get(`${environment.api}/api/WeatherForecast`)
      .subscribe((data: any) => {
        this.forecast = data;
      });
  }
}
