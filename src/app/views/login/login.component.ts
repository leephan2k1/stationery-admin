import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthForm } from 'src/app/common/interfaces/authForm.interface';
import { Credentials } from 'src/app/common/interfaces/credentials.interface';
import { Errors } from 'src/app/models/error.response';
import { UserService } from 'src/app/services/user.service';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
})
export class LoginComponent implements OnInit, OnDestroy {
  errors: Errors | null = null;
  isSubmitting: boolean = false;
  authForm: FormGroup<AuthForm>;
  destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.userService.isAuthenticated
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        if (isAuth) {
          this.router.navigate(['/']);
        }
      });
  }

  submitForm() {
    this.isSubmitting = true;

    const observable = this.userService.login(
      this.authForm.value as Credentials
    );

    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errors = {
          message: err.error.message,
          statusCode: err.error.statusCode,
        } as Errors;

        this.isSubmitting = false;
      },
    });
  }

  clearErrors() {
    this.errors = null;
  }
}
