import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupplierFm } from '~/common/interfaces/supplierFm.interface';
import { HotToastService } from '@ngneat/hot-toast';
import { SupplierService } from '~/services';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  standalone: true,
})
export class SupplierEditComponent {
  supplierFm: FormGroup<SupplierFm>;

  constructor(
    private readonly toast: HotToastService,
    private readonly supplierService: SupplierService
  ) {
    this.supplierFm = new FormGroup<SupplierFm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      country: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  submitForm() {
    const { name, country } = this.supplierFm.value;
    this.supplierService
      .createSupplier({ name: String(name), country: String(country) })
      .subscribe({
        next: () => {
          this.toast.success('Thêm nhà cung cấp thành công!');
          this.supplierFm.reset();
        },
        error: () => {
          this.toast.error('Oops! Lỗi');
        },
      });
  }
}
