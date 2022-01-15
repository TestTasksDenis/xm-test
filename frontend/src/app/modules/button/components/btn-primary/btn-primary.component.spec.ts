import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnPrimaryComponent } from './btn-primary.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PrimaryComponent', () => {
  let component: BtnPrimaryComponent;
  let fixture: ComponentFixture<BtnPrimaryComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BtnPrimaryComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrimaryComponent);
    component = fixture.componentInstance;
    // eslint-disable-next-line prefer-destructuring
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create BtnFilledPrimaryComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when user clicks on the button', () => {
    spyOn(component.clickEvent, 'emit');

    const button = fixture.nativeElement.querySelector('.btn');

    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.clickEvent.emit).toHaveBeenCalled();
  });

  it('shouldn\'t be rounded if input prop round = false', () => {
    component.rounded = false;

    fixture.detectChanges();

    const button = debugElement.query(By.css('.btn--rounded'));

    expect(component.rounded).toBeFalse();
    expect(button).toBeNull();
  });

  it('should be rounded if input prop round = true', () => {
    component.rounded = true;

    fixture.detectChanges();

    const button = debugElement.query(By.css('.btn--rounded'));

    expect(component.rounded).toBeTrue();
    expect(button).not.toBeNull();
  });

  it('should add classes to the button when adding classes with prop \'cssClasses\'', () => {
    component.cssClasses = ['awesome-btn', 'awesome-btn-2'];

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.awesome-btn.awesome-btn-2'));

    expect(button).not.toBeNull();
  });
});
