import {
    Validators,
    FormGroup,
    FormControl,
    ReactiveFormsModule,
  } from "@angular/forms";

export interface AuthForm {
    email: FormControl<string>;
    password: FormControl<string>;
}