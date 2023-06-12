import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queries } from '../common/interfaces/listQuery.interface';
import { ApiResponseList } from '../models/api.response';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private readonly http: HttpClient) {}

  public getCategories({
    page,
    limit,
  }: Queries): Observable<ApiResponseList<Supplier>> {
    return this.http.get<ApiResponseList<Supplier>>('/suppliers', {
      params: { page, limit },
    });
  }
}
