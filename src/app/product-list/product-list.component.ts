import {
  Component,
  AfterViewInit,
  viewChild,
  OnInit,
  inject,
} from '@angular/core';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements AfterViewInit, OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined = this.products[0];
  productDetail = viewChild(ProductDetailComponent);
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  onAdded(product: Product) {
    alert(`${this.selectedProduct?.title} added to cart!`);
  }

  ngAfterViewInit(): void {
    if (this.productDetail()) {
      console.log(this.productDetail()!.product);
    }
  }
}
