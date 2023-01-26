import { AbstractControl, ValidatorFn } from '@angular/forms';

export function areEquals(compareField, fieldMessage = null): ValidatorFn {
  return (control: AbstractControl): any => {

    if (
      control.value
      && control.parent
    ) {

      if (
        control.parent.controls[compareField]
        && control.parent.controls[compareField].value != control.value
      ) {
        return {'areEquals': fieldMessage ? fieldMessage : true};
      } else {
        control.parent.controls[compareField].updateValueAndValidity();
        control.parent.controls[compareField].markAsPristine();
      }

    }

    return null;
  }
}
