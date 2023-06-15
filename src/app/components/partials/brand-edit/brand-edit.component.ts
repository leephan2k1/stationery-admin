import { Component } from '@angular/core';
import { BrandService } from '~/services';
import { HotToastService } from '@ngneat/hot-toast';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandFm } from '~/common/interfaces/brandFm.interface';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  standalone: true,
})
export class BrandEditComponent {
  brandFm: FormGroup<BrandFm>;
  constructor(
    private readonly brandService: BrandService,
    private readonly toast: HotToastService
  ) {
    this.brandFm = new FormGroup<BrandFm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  submitForm() {
    const { name } = this.brandFm.value;
    this.brandService.createBrand({ name: String(name) }).subscribe({
      next: () => {
        this.toast.success('Thêm thương hiệu thành công!');
        this.brandFm.reset();
      },
      error: () => {
        this.toast.error('Thêm thương hiệu thất bại!');
      },
    });
  }
}
