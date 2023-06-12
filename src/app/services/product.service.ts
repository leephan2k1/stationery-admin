import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '~/models/product.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '~/models';

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
}
