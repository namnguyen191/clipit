import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface IAlert {
  show: boolean;
  msg: string;
  color: 'red' | 'green' | 'blue';
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() color: string = 'blue';

  get bgColor() {
    return `bg-${this.color}-400`;
  }

  constructor() {}
}
