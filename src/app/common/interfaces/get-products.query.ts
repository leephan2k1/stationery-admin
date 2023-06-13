export interface GetProductsQuery {
  page: number;
  limit: number;
  order: 'desc' | 'asc';
}
