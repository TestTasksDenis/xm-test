import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Environment } from '../../../../../../tokens/environment.token';
import { Whether } from '../../types/whether.interface';

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
