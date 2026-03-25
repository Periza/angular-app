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

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private builder: FormBuilder,
  ) {}

  private destoryRef = inject(DestroyRef);

  productForm:
    | FormGroup<{
        title: FormControl<string>;
        price: FormControl<number | undefined>;
        category: FormControl<string>;
      }>
    | undefined;

  createProduct() {
    this.productsService.addProduct(this.productForm!.value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  private buildForm() {
    this.productForm = this.builder.nonNullable.group({
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
  }

  ngOnInit(): void {
    this.productForm?.controls.category.valueChanges
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(() => {
        this.productForm?.controls.price.reset();
      });
  }
}
