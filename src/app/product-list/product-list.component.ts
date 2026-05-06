import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { SortPipe } from '../sort.pipe';
import { switchMap, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  imports: [SortPipe, RouterLink, RouterOutlet, MatMiniFabButton, MatIcon],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private route = inject(ActivatedRoute);

  products = toSignal(
    this.route.data.pipe(
      switchMap((data) => of(data['products'] as Product[])),
    ),
    { initialValue: [] as Product[] },
  );
}
