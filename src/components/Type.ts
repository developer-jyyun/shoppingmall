export interface Product {
  id: string;
  title: string;
  price: null | number;
  image: string;
  options?: string | string[];
  description?: string;
}
