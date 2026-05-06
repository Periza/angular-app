import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { priceMaxiumValidator } from '../price-maximum.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatError, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, MatButton, MatInput, MatFormField, MatError, MatLabel],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private builder = inject(FormBuilder);
  private destoryRef = inject(DestroyRef);

  productForm = this.builder.nonNullable.group({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        priceMaxiumValidator(1000),
      ],
    }),
    category: new FormControl('', { nonNullable: true }),
  });

  createProduct() {
    this.productsService.addProduct(this.productForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  ngOnInit(): void {
    this.productForm.controls.category.valueChanges
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(() => {
        this.productForm.controls.price.reset();
      });
  }
}
