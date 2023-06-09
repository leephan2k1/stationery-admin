import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthForm } from 'src/app/common/interfaces/authForm.interface';
import { Credentials } from 'src/app/common/interfaces/credentials.interface';
import { Errors } from 'src/app/models/error.response';

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

  ngOnInit() {}

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
