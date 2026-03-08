import {
  Component,
  AfterViewInit,
  viewChild,
  OnInit,
  inject,
  DestroyRef
} from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Observable, Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent {
  
  products$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;
  products = toSignal(inject(ProductsService).getProducts(), {
    initialValue: []
  });


  onAdded(product: Product) {
    alert(`${this.selectedProduct?.title} added to cart!`);
  }
}
