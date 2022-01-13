import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DashboardService } from './services/dashboard/dashboard.service';
import { DashboardStubClass } from './classes/dashboard-stub.class';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        DashboardService,
        {
          provide: DashboardService,
          useClass: DashboardStubClass,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dashboardService = fixture.debugElement.injector.get(DashboardService);

    fixture.detectChanges();
  });

  it('should create DashboardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create Show Weather Data', fakeAsync(() => {
    const el = fixture.debugElement.query(By.css('.dashboard__data'));

    dashboardService.getWeatherForecast().subscribe();
    tick(2000);

    expect(el).not.toBeNull();
  }));
});
