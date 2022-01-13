import { Whether } from '../types/whethe.interface';
import { Observable, of } from 'rxjs';

export class DashboardStubClass {
  getWeatherForecast(): Observable<Whether[]> {
    return of([
      {
        date: new Date('2022-01-14T20:55:18.5705478+02:00'),
        temperatureC: -18,
        temperatureF: 0,
        summary: 'Freezing',
      },
      {
        date: new Date('2022-01-15T20:55:18.5705514+02:00'),
        temperatureC: 10,
        temperatureF: 49,
        summary: 'Freezing',
      },
      {
        date: new Date('2022-01-16T20:55:18.5705517+02:00'),
        temperatureC: 45,
        temperatureF: 112,
        summary: 'Sweltering',
      },
      {
        date: new Date('2022-01-17T20:55:18.570552+02:00'),
        temperatureC: 39,
        temperatureF: 102,
        summary: 'Chilly',
      },
      {
        date: new Date('2022-01-18T20:55:18.5705522+02:00'),
        temperatureC: 14,
        temperatureF: 57,
        summary: 'Mild',
      },
    ]);
  }
}
