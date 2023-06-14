import { Component, OnDestroy, OnInit } from '@angular/core';
import { WarehouseService } from '~/services';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';
import { Warehouse } from '~/models';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WhForm } from '~/common/interfaces/warehouseForm.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class WarehouseEditComponent implements OnDestroy {
  addWhForm: FormGroup<WhForm>;
  destroy$ = new Subject<void>();

  constructor(
    private readonly whService: WarehouseService,
    private readonly toast: HotToastService
  ) {
    this.addWhForm = new FormGroup<WhForm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      location: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm() {
    this.whService
      // @ts-ignore
      .addWarehouse(this.addWhForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.success('Thêm kho thành công!');
        },
        error: () => {
          this.toast.error('Oops! Lỗi');
        },
      });
  }
}
