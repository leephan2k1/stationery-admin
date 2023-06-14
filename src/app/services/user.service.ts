import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Credentials } from '../common/interfaces/credentials.interface';
import { ApiResponse, ApiResponseList } from '../models/api.response';
import { User } from '../models/user.model';
import { BaseQuery } from '~/common/interfaces/base.query';
import { GetUserQuery } from '~/services/get-user.query';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(
    map((user) => {
      return !!user;
    })
  );

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getUsers({
    page,
    sort,
    limit,
    name,
    role,
    permission,
  }: GetUserQuery): Observable<ApiResponseList<User>> {
    const params = new Map();
    if (name) params.set('name', name);
    if (role) params.set('role', role);
    if (permission) params.set('permission', permission);
    params.set('page', page);
    params.set('sort', sort);
    params.set('limit', limit);

    return this.http.get<ApiResponseList<User>>(`/users`, {
      params: Object.fromEntries(params),
      withCredentials: true,
    });
  }

  deleteUser(id: string): Observable<ApiResponse<User>> {
    return this.http.delete<ApiResponse<User>>(`/users/${id}`, {
      withCredentials: true,
    });
  }

  getCurrentUser(): Observable<ApiResponse<User>> {
    return this.http
      .get<ApiResponse<User>>('/auth/status', { withCredentials: true })
      .pipe(
        tap({
          next: ({ data }) => {
            this.setAuth(data);
          },
          error: () => this.purgeAuth(),
        })
      );
  }

  setAuth(user: User): void {
    this.currentUserSubject.next(user);
  }

  login(credentials: Credentials): Observable<ApiResponse<User>> {
    return this.http
      .post<ApiResponse<User>>('/auth/sign-in', credentials, {
        withCredentials: true,
      })
      .pipe(tap(({ data }) => this.setAuth(data)));
  }

  logout() {
    this.http
      .get('/auth/sign-out', { withCredentials: true })
      .subscribe((response) => {
        //@ts-ignore
        if (response?.ok) {
          this.purgeAuth();
          this.router.navigate(['/login']);
        } else {
          console.error('logout error');
        }
      });
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}
