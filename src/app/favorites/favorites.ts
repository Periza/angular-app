import { FavoritesService } from './favorites.service'
import { ProductsService } from '../products.service'

export function favoritesFactory(isFavorite: boolean) {
    return () => {
        return isFavorite ? new FavoritesService() : new ProductsService();
    }
}