import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() placeHolder: string = '';
  @Input() format: string = '';

  constructor() {}
}
