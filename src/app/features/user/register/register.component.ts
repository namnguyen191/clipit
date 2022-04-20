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
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.maxLength(13),
    Validators.minLength(13)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmedPassword = new FormControl('', [Validators.required]);
  registerForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmedPassword: this.confirmedPassword,
    phoneNumber: this.phoneNumber
  });

  alert = {
    show: false,
    color: 'blue',
    msg: 'Please wait while your account is being created!'
  };

  constructor() {
    this.alert = {
      show: true,
      msg: 'Please wait while your account is being created!',
      color: 'blue'
    };
  }

  onFormSubmit() {}

  // private _initRegisterForm() {
  //   this.registerForm.addControl(
  //     this.registerFormFields.name,
  //     new FormControl('', [Validators.required])
  //   );
  //   this.registerForm.addControl(
  //     this.registerFormFields.email,
  //     new FormControl('', [Validators.required])
  //   );
  //   this.registerForm.addControl(
  //     this.registerFormFields.age,
  //     new FormControl('', [Validators.required])
  //   );
  //   this.registerForm.addControl(
  //     this.registerFormFields.phoneNumber,
  //     new FormControl('', [Validators.required])
  //   );
  //   this.registerForm.addControl(
  //     this.registerFormFields.password,
  //     new FormControl('', [Validators.required])
  //   );
  //   this.registerForm.addControl(
  //     this.registerFormFields.confirmedPassword,
  //     new FormControl('', [Validators.required])
  //   );
  // }
}
