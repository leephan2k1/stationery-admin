export interface Product {
  id: string;
  name: string;
  product_slug: string;
  category: string;
  brand: string;
  supplier: string;
  specific_properties: object;
  price: number;
  thumbnail: string;
  discount_percent: number;
  images?: string[];
  description: string;
}
