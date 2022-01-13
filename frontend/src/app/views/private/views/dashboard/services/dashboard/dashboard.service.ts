import { Injectable } from '@angular/core';
import { Environment } from '../../../../../../tokens/environment.token';
import { Observable } from 'rxjs';
import { Whether } from '../../types/whethe.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly url = `${this.environment.backendUrl}/weatherForecast`;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly environment: Environment,
  ) { }

  getWeatherForecast(): Observable<Whether[]> {
    return this.httpClient.get<Whether[]>(`${this.url}`);
  }
}
