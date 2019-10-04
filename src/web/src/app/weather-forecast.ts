export class WeatherForecast {
  public date: Date;
  public temperatureC: number;
  public temperatureF: number;
  public summary: string;
  constructor(obj?: WeatherForecast) {
    this.date = obj && obj.date || new Date();
    this.temperatureC = obj && obj.temperatureC || 0;
    this.temperatureF = obj && obj.temperatureF || 0;
    this.summary = obj && obj.summary || '';
  }
}
