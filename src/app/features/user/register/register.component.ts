import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  registerFormFields = {
    name: 'name',
    email: 'email',
    age: 'age',
    password: 'password',
    confirmedPassword: 'confirmedPassword',
    phoneNumber: 'phoneNumber'
  };
  registerForm: FormGroup = new FormGroup({});

  constructor() {
    this._initRegisterForm();
  }

  private _initRegisterForm() {
    this.registerForm.addControl(
      this.registerFormFields.name,
      new FormControl('', [Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormFields.email,
      new FormControl('', [Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormFields.age,
      new FormControl('', [Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormFields.phoneNumber,
      new FormControl('', [Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormFields.password,
      new FormControl('', [Validators.required])
    );
    this.registerForm.addControl(
      this.registerFormFields.confirmedPassword,
      new FormControl('', [Validators.required])
    );
  }
}
