import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

import { InputComponent } from './input.component';
import { InputType } from '../../types/input-type.type';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    // eslint-disable-next-line prefer-destructuring
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  describe('Common', () => {
    it('should create InputComponent instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Input props', () => {
    it('should show label if pass label prop', () => {
      component.label = 'Email';

      fixture.detectChanges();

      const $label = debugElement.query(By.css('.input__label'));

      expect($label.nativeElement.textContent.trim()).toBe('Email');
      expect($label).not.toBeNull();
    });

    it('should add attribute type if pass type prop', () => {
      const typeAttribute: InputType = 'email';
      component.type = typeAttribute;

      fixture.detectChanges();

      const $input = debugElement.query(By.css('.input__control'));

      expect($input.nativeElement.getAttribute('type')).toEqual(typeAttribute);
    });

    it('should add attribute placeholder if pass placeholder prop', () => {
      const placeholder = 'Email';
      component.placeholder = placeholder;

      fixture.detectChanges();

      const $input = debugElement.query(By.css('.input__control'));

      expect($input.nativeElement.getAttribute('placeholder')).toEqual(placeholder);
    });

    it('should add attribute readonly if pass readonly prop', () => {
      component.readonly = true;

      fixture.detectChanges();

      const $input = debugElement.query(By.css('.input__control'));

      expect($input.nativeElement.getAttribute('readonly')).toBe('');
    });

    it('should add attribute autocomplete if pass autocomplete prop', () => {
      component.autocomplete = true;

      fixture.detectChanges();

      const $input = debugElement.query(By.css('.input__control'));

      expect($input.nativeElement.getAttribute('autocomplete')).toBe('true');
    });
  });

  describe('ControlValueAccessor methods', () => {
    it('writeValue should assign value', () => {
      const value = 'some value';

      component.writeValue(value);

      expect(component.value).toBe(value);
    });

    it('setDisabledState should assign value to isDisabled', () => {
      component.setDisabledState(true);

      expect(component.isDisabled).toBeTrue();
    });
  });

  describe('Input events', () => {
    it('should prop isActive to be true when focusin on input', () => {
      const $input = debugElement.query(By.css('.input__control'));

      $input.nativeElement.dispatchEvent(new Event('focusin'));

      fixture.detectChanges();

      expect(component.isActive).toBeTrue();
    });

    it('should set isTouched to true if value more than 1 symbol', () => {
      const $input = debugElement.query(By.css('.input__control'));
      component.value = 'Some test value';

      $input.nativeElement.dispatchEvent(new Event('focusout'));

      fixture.detectChanges();

      expect(component.isTouched).toBeTrue();
    });

    it('should set isActive to false if _value less than 1 symbol', () => {
      const $input = debugElement.query(By.css('.input__control'));

      $input.nativeElement.dispatchEvent(new Event('focusout'));

      fixture.detectChanges();

      expect(component.isActive).toBeFalse();
    });
  });
});
