export interface Product {
  id: number;
  title: string;
  price: number;
  icon: string;
  categories: Record<number, string>;
}
