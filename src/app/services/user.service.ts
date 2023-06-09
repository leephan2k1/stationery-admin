import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { map, distinctUntilChanged, tap, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Credentials } from '../common/interfaces/credentials.interface';
import { ApiResponse } from '../models/api.response';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(credentials: Credentials): Observable<ApiResponse<User>> {
    return this.http
      .post<ApiResponse<User>>('/auth/sign-in', credentials, {
        withCredentials: true,
      })
      .pipe(tap(({ data }) => this.setAuth(data)));
  }

  logout() {
    this.purgeAuth();
    void this.router.navigate(['/login']);
  }

  setAuth(user: User): void {
    this.currentUserSubject.next(user);
  }

  purgeAuth(): void {
    this.currentUserSubject.next(null);
  }
}
