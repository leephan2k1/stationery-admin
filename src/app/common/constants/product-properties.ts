import { ProductType } from '../interfaces/product-type.interface';

export const productBookProperties: ProductType[] = [
  { label: 'tác giả', value: 'author' },
  { label: 'dịch giả', value: 'translator' },
  { label: 'nhà xuất bản', value: 'publisher' },
  { label: 'số trang', value: 'qty_of_page' },
  { label: 'hình thức', value: 'book_layout' },
];

export const productToyProperties: ProductType[] = [
  { label: 'độ tuổi', value: 'age' },
  { label: 'màu sắc', value: 'color' },
  { label: 'chất liệu', value: 'material' },
  { label: 'thông số kỹ thuật', value: 'specification' },
];

export const productStationery: ProductType[] = [
  { label: 'chất liệu', value: 'material' },
  { label: 'màu sắc', value: 'color' },
];
