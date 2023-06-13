import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '~/models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseList } from '~/models';
import { GetProductsQuery } from '~/common/interfaces/get-products.query';

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
    page,
    sort,
    limit,
  }: GetProductsQuery): Observable<ApiResponseList<Product>> {
    return this.http.get<ApiResponseList<Product>>('/products', {
      params: {
        page,
        sort,
        limit,
      },
    });
  }
}
