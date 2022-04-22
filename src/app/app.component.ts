import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NavigationCancel,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'clipit';
  loading$: Observable<boolean> = of(false);

  constructor(private router: Router) {
    this.loading$ = this.router.events.pipe(
      map((ev) => {
        if (ev instanceof RouteConfigLoadStart) {
          return true;
        }

        if (
          ev instanceof RouteConfigLoadEnd ||
          ev instanceof NavigationCancel
        ) {
          return false;
        }

        return false;
      })
    );
  }
}
