import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '~/models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseList } from '~/models';
import { BaseQuery } from '~/common/interfaces/base.query';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  createProduct(prod: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`/products`, prod, {
      withCredentials: true,
    });
  }

  getProducts({
    name,
    page,
    sort,
    limit,
  }: BaseQuery): Observable<ApiResponseList<Product>> {
    const params = new Map();
    if (name) params.set('name', name);
    params.set('page', page);
    params.set('sort', sort);
    params.set('limit', limit);

    return this.http.get<ApiResponseList<Product>>('/products', {
      params: Object.fromEntries(params),
    });
  }

  deleteProduct(prodSlug: string): Observable<ApiResponse<Product>> {
    return this.http.delete<ApiResponse<Product>>(`/products/${prodSlug}`, {
      withCredentials: true,
    });
  }
}
