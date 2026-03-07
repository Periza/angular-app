import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor() {}

  private products: Product[] = [
    {
        id: 1,
        title: 'Keyboard',
        price: 100,
        icon: '⌨️',
        categories: {
          1: 'Computing',
          2: 'Peripherals',
        },
      },
      {
        id: 2,
        title: 'Microphone',
        price: 35,
        icon: '🎙️',
        categories: { 3: 'Mulitmedia' },
      },
      {
        id: 3,
        title: 'Web camera',
        price: 79,
        icon: '📷',
        categories: {
          1: 'Computing',
          3: 'Multimedia',
        },
      },
      {
        id: 4,
        title: 'Tablet',
        price: 500,
        icon: '🏷️',
        categories: { 4: 'Entertainment' },
      }
  ]

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
