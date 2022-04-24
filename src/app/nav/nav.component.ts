import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  constructor(public authService: AuthService) {}

  async logout(e: Event) {
    e.preventDefault();

    await this.authService.logout();
  }
}
