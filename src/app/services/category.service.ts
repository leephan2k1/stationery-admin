import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, ApiResponseList } from '~/models';
import { Category } from '~/models';
import { Queries } from '~/common/interfaces/listQuery.interface';

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

  public addCategory(payload: {
    name: string;
    parentCategory?: string;
  }): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>('/categories', payload, {
      withCredentials: true,
    });
  }

  public deleteCategory(slug: string): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(`/categories/${slug}`, {
      withCredentials: true,
    });
  }
}
