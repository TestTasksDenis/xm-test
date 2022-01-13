import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dictionary } from '../../../../types/dictionary.interface';

@Component({
  selector: 'xm-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.scss'],
})
export class BtnPrimaryComponent {
  @Input() isDisabled = false;
  @Input() styles: Dictionary = {} as Dictionary;
  @Input() cssClasses: string[] = [];
  @Input() rounded = false;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clickEvent.emit();
  }
}
