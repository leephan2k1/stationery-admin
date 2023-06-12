import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Queries } from '../common/interfaces/listQuery.interface';
import { ApiResponseList } from '../models/api.response';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  public getCategories({
    page,
    limit,
  }: Queries): Observable<ApiResponseList<Category>> {
    return this.http.get<ApiResponseList<Category>>('/categories', {
      params: { page, limit },
    });
  }
}
