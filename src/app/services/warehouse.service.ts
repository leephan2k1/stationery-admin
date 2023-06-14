import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseQuery } from '~/common/interfaces/base.query';
import { Observable } from 'rxjs';
import { ApiResponseList, Warehouse } from '~/models';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
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

    return this.http.get<ApiResponseList<Warehouse>>('/warehouses', {
      params: Object.fromEntries(params),
    });
  }
}
