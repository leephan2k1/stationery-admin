export interface BaseQuery {
  page: number;
  limit: number;
  sort: 'desc' | 'asc';
  name?: string;
}
