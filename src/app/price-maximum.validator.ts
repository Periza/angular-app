import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function priceMaxiumValidator(price: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isMax = control.value <= price;
    return isMax ? null : { priceMaximum: true };
  };
}
