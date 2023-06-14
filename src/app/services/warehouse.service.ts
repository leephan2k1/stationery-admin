import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseQuery } from '~/common/interfaces/base.query';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseList, Warehouse } from '~/models';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private basePath: string = 'warehouses';
  warehouses: Warehouse[] = [];
  constructor(private readonly http: HttpClient) {}

  getWarehouses({
    name,
    limit,
    sort,
    page,
  }: BaseQuery): Observable<ApiResponseList<Warehouse>> {
    const params = new Map();
    if (name) params.set('name', name);
    params.set('page', page);
    params.set('sort', sort);
    params.set('limit', limit);

    return this.http.get<ApiResponseList<Warehouse>>(`/${this.basePath}`, {
      params: Object.fromEntries(params),
    });
  }

  addWarehouse(payload: {
    name: string;
    location: string;
  }): Observable<ApiResponse<Warehouse>> {
    return this.http.post<ApiResponse<Warehouse>>(
      `/${this.basePath}`,
      payload,
      {
        withCredentials: true,
      }
    );
  }

  updateProdToWarehouse({
    idWh,
    sku,
    quantity,
  }: {
    idWh: string;
    sku: string;
    quantity: number;
  }): Observable<ApiResponse<Warehouse>> {
    return this.http.put<ApiResponse<Warehouse>>(
      `/${this.basePath}/${idWh}`,
      {
        products: [{ sku, quantity }],
      },
      { withCredentials: true }
    );
  }

  deleteWarehouse(id: string): Observable<ApiResponse<Warehouse>> {
    return this.http.delete<ApiResponse<Warehouse>>(`/${this.basePath}/${id}`, {
      withCredentials: true,
    });
  }
}
