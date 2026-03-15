import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsService } from './products.service';
import { authGuard } from './auth.guard';
import { checkoutGuard } from './checkout.guard'
import { productsResolver } from './products.resolver';

export const routes: Routes = [
    {
        path: 'products', 
        component: ProductListComponent,
        children: [
            { path: 'new', component: ProductCreateComponent },
            { path: ':id', component: ProductDetailComponent }
        ],
        providers: [ProductsService],
        resolve: { products: productsResolver }
    },
    { path: 'cart', component: CartComponent, canActivate: [authGuard], canDeactivate: [checkoutGuard] },
    { path: 'user', loadComponent: () => import('./user/user.component').then(c => c.UserComponent), canMatch: [authGuard]},
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', redirectTo: 'products' }
];
