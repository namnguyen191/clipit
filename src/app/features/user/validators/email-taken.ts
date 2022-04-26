import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors
} from '@angular/forms';
import { delay, from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
  constructor(private angularFireAuth: AngularFireAuth) {}

  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(500),
      switchMap((email) =>
        from(this.angularFireAuth.fetchSignInMethodsForEmail(email))
      ),
      map((res) => {
        return res.length > 0 ? { emailTaken: true } : null;
      })
    );
  };
}
