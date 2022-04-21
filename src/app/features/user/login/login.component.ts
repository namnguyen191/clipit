import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  constructor() {}

  login() {
    console.log('Nam data is: ', this.credentials);
  }
}
