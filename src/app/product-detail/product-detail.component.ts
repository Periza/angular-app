import { CurrencyPipe, AsyncPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Product } from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  product$: Observable<Product> | undefined;
  added = output<Product>();
  id = input<number>();

  constructor(private productsService: ProductsService){}
  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productsService.getProduct(this.id()!);
  }

  addToCart(product: Product) {
    this.added.emit(product);
  }
}
