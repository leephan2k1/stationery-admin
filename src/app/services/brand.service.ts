import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queries } from '../common/interfaces/listQuery.interface';
import { ApiResponseList } from '../models/api.response';
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private readonly http: HttpClient) {}

  public getCategories({
    page,
    limit,
  }: Queries): Observable<ApiResponseList<Brand>> {
    return this.http.get<ApiResponseList<Brand>>('/brands', {
      params: { page, limit },
    });
  }
}
