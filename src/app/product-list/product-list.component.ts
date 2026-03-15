import {
  Component,
  inject,
} from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { ProductsService } from '../products.service';
import { Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  imports: [SortPipe, RouterLink, RouterOutlet],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  products = toSignal(
    this.route.queryParamMap.pipe(
      switchMap(params => {
        return this.productService.getProducts(Number(params.get('limit')) || 10);
      })
    ),
    { initialValue: [] as Product[] }
  );
}
