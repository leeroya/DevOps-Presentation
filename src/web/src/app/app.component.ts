import { Component, OnInit, ViewChild, AfterViewInit, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatSort, MatTableDataSource, Sort } from '@angular/material';
import { WeatherForecast } from './weather-forecast';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DemoWeb';
  columnsToDisplay = ['date', 'temperatureC', 'temperatureF', 'summary'];
  dataSource: MatTableDataSource<WeatherForecast>;
  sortedData: WeatherForecast[];
  busy: boolean;
  private _forecasts: Array<WeatherForecast>;
  public get forecasts(): Array<WeatherForecast> {
    return this._forecasts;
  }

  public set forecasts(v: Array<WeatherForecast>) {
    this._forecasts = v;
  }
  @ViewChild(MatPaginator) userMeetingsPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public http: HttpClient
  ) {
    this.forecasts = [];
    this.sortedData = this.forecasts.slice();
    this.dataSource = new MatTableDataSource(this.forecasts);
  }
  ngOnInit() {
    this.busy = true;
    this.getData().subscribe((data: any) => {
      this.forecasts = [];
      this.forecasts = data;
      this.dataSource = new MatTableDataSource(this.forecasts);
      this.dataSource.sort = this.sort;
      this.sortedData = this.forecasts.slice();
      this.dataSource.paginator = this.userMeetingsPaginator;
    });
  }

  public getData(): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http.get(`${environment.api}/weatherforecast`, {headers});
  }
}
