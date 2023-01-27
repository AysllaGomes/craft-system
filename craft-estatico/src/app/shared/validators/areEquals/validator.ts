import { AbstractControl, ValidatorFn } from '@angular/forms';

// @ts-ignore
export function areEquals(compareField, fieldMessage = null): ValidatorFn {
  return (control: AbstractControl): any => {

    if (
      control.value
      && control.parent
    ) {

      if (
        // @ts-ignore
        control.parent.controls[compareField]
        // @ts-ignore
        && control.parent.controls[compareField].value != control.value
      ) {
        return {'areEquals': fieldMessage ? fieldMessage : true};
      } else {
        // @ts-ignore
        control.parent.controls[compareField].updateValueAndValidity();
        // @ts-ignore
        control.parent.controls[compareField].markAsPristine();
      }

    }

    return null;
  }
}
