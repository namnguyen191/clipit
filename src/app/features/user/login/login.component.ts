import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { IAlert } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  alert$: Subject<IAlert> = new Subject<IAlert>();
  processing$: Subject<boolean> = new Subject<boolean>();
  credentials = {
    email: '',
    password: ''
  };
  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) {}

  async login(): Promise<void> {
    try {
      this.alert$.next({
        show: true,
        msg: 'Please wait while we are processing your request',
        color: 'blue'
      });
      this.processing$.next(true);
      await this.authService.login(this.credentials);
    } catch (e) {
      this.processing$.next(false);
      this.alert$.next({
        show: true,
        msg: 'Something went wrong, please try again later',
        color: 'red'
      });
      console.log('Nam data is: ', e);
      return;
    }

    this.alert$.next({
      show: true,
      msg: 'Success, you are now logged in!',
      color: 'green'
    });
    this.processing$.next(false);

    setTimeout(() => {
      this.navService.back();
    }, 1000);
  }
}
