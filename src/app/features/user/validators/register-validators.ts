import { AbstractControl, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(args: {
    controlName: string;
    matchingControlName: string;
  }): ValidatorFn {
    const { controlName, matchingControlName } = args;
    return (group: AbstractControl) => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        console.error('Form controls cannot be found in the form group');
        return {
          controlNotFound: false
        };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      matchingControl.setErrors(error);

      return error;
    };
  }
}
