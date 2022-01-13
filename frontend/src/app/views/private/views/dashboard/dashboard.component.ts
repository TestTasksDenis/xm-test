import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard/dashboard.service';
import { WithDestroy } from '../../../../mixins/with-destroy.mixin';

@Component({
  selector: 'xm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends WithDestroy() {
  weather$ = this.dashboardService.getWeatherForecast();

  constructor(
    private readonly dashboardService: DashboardService,
  ) {
    super();
  }
}
