import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { InputType } from '../../types/input-type.type';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'xm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true,
  }],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string | null = null;
  @Input() isRequired = false;
  @Input() type: InputType = 'text';
  @Input() placeholder: string | undefined;
  @Input() readonly = false;
  @Input() autocomplete = true;
  @Input() isDisabled = false;
  @Input() showAsRequired = false;
  private _value = '';
  private onTouched: () => void;
  private onChange: (value: string) => void;
  showEyeBtn = false;
  isActive = false;
  isTouched = false;
  inputId = `id-${(Math.random() * Date.now()).toFixed()}`;

  constructor() {
    // eslint-disable-next-line no-empty-function
    this.onChange = () => {};
    // eslint-disable-next-line no-empty-function
    this.onTouched = () => {};
  }

  ngOnInit(): void {
    if (this.type === 'password') {
      this.showEyeBtn = true;
    }
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(this._value);
  }

  onFocusIn(): void {
    this.isActive = true;
  }

  onFocusOut(): void {
    if (this.value?.length) {
      this.onTouched();
      this.isTouched = true;
    } else {
      this.isActive = false;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  changeType() {
    if (this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
