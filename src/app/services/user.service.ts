import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Credentials } from '../common/interfaces/credentials.interface';
import { ApiResponse } from '../models/api.response';
import { User } from '../models/user.model';

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
    this.purgeAuth();
    return this.http.get('/auth/sign-out', { withCredentials: true }).pipe(
      tap({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          console.error('logout error!')
        }
      })
    );
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}
