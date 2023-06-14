export interface Warehouse {
  id: string;
  name: string;
  location: string;
  products: { sku: string; quantity: number }[];
}
