export interface GetProductsQuery {
  page: number;
  limit: number;
  sort: 'desc' | 'asc';
  name?: string;
}
