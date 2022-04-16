import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input() tabTitle: string = '';

  @Input()
  set active(newActive: boolean) {
    this._active = newActive;
    // manually trigger change dectection here cause too lazy to convert to observable...
    this.cdr.detectChanges();
  }
  get active() {
    return this._active;
  }
  private _active: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}
}
