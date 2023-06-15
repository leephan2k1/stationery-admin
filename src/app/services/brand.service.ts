import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queries } from '~/common/interfaces/listQuery.interface';
import { ApiResponse, ApiResponseList } from '~/models';
import { Brand } from '~/models';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private readonly http: HttpClient) {}

  public getBrands({
    page,
    limit,
  }: Queries): Observable<ApiResponseList<Brand>> {
    return this.http.get<ApiResponseList<Brand>>('/brands', {
      params: { page, limit },
    });
  }

  public deleteBrand(id: string): Observable<ApiResponse<Brand>> {
    return this.http.delete<ApiResponse<Brand>>(`/brands/${id}`, {
      withCredentials: true,
    });
  }

  public createBrand(payload: {
    name: string;
  }): Observable<ApiResponse<Brand>> {
    return this.http.post<ApiResponse<Brand>>(`/brands`, payload, {
      withCredentials: true,
    });
  }
}
