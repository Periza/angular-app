import { Directive, input, numberAttribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { priceMaxiumValidator } from './price-maximum.validator';

@Directive({
  selector: '[appPriceMaximum]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PriceMaximumDirective,
      multi: true
    }
  ]
})
export class PriceMaximumDirective implements Validator {

  appPriceMaximum = input(undefined, {
    alias: 'treshold',
    transform: numberAttribute
  })

  constructor() { }


  validate(control: AbstractControl): ValidationErrors | null {
    return this.appPriceMaximum ? priceMaxiumValidator(this.appPriceMaximum()!)(control) : null;
  }

}
