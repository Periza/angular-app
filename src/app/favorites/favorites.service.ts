import { Product } from '../product';
import { ProductsService } from '../products.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends ProductsService {

  constructor() {
    super();
   }

   override getProducts() {
    return super.getProducts().slice(1, 3);
   }
}
