import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { IAlert } from 'src/app/shared/alert/alert.component';

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

  alert$: Subject<IAlert> = new Subject<IAlert>();
  processing$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private navService: NavigationService
  ) {}

  async onFormSubmit() {
    this.processing$.next(true);
    this.alert$.next({
      show: true,
      msg: 'Please wait while your account is being created!',
      color: 'blue'
    });

    const { email, password }: { email: string; password: string } =
      this.registerForm.value;
    try {
      await this.authService.createUser(this.registerForm.value);
    } catch (e) {
      if (e instanceof FirebaseError) {
        this.alert$.next({
          show: true,
          msg: e.message,
          color: 'red'
        });
      } else {
        console.log('Nam data is: ', e);
        this.alert$.next({
          show: true,
          msg: 'Something went wrong. Please try again later.',
          color: 'red'
        });
      }
      this.processing$.next(false);

      return;
    }

    this.processing$.next(false);
    this.alert$.next({
      show: true,
      msg: 'Success! Your account has been created!',
      color: 'green'
    });

    setTimeout(() => {
      this.navService.back();
    }, 1000);
  }

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
