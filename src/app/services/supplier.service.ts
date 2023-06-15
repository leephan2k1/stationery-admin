import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queries } from '~/common/interfaces/listQuery.interface';
import { ApiResponse, ApiResponseList } from '~/models';
import { Supplier } from '~/models';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private basePath = 'suppliers';
  constructor(private readonly http: HttpClient) {}

  public getSupplier({
    page,
    limit,
  }: Queries): Observable<ApiResponseList<Supplier>> {
    return this.http.get<ApiResponseList<Supplier>>(`/${this.basePath}`, {
      params: { page, limit },
    });
  }

  public createSupplier(payload: {
    name: string;
    country: string;
  }): Observable<ApiResponse<Supplier>> {
    return this.http.post<ApiResponse<Supplier>>(`/${this.basePath}`, payload, {
      withCredentials: true,
    });
  }

  public deleteSupplier({
    id,
  }: {
    id: string;
  }): Observable<ApiResponse<Supplier>> {
    return this.http.delete<ApiResponse<Supplier>>(`/${this.basePath}/${id}`, {
      withCredentials: true,
    });
  }
}
