import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard/dashboard.service';

@Component({
  selector: 'xm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  weather$ = this.dashboardService.getWeatherForecast();

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}
}
