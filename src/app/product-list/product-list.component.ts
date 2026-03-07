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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements AfterViewInit, OnInit {
  
  products$: Observable<Product[]> | undefined;
  selectedProduct: Product | undefined;
  productDetail = viewChild(ProductDetailComponent);
  private productService = inject(ProductsService);
  private productsSub: Subscription | undefined;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getProducts();
  }

  onAdded(product: Product) {
    alert(`${this.selectedProduct?.title} added to cart!`);
  }

  ngAfterViewInit(): void {
    if (this.productDetail()) {
      console.log(this.productDetail()!.product);
    }
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }
}
