import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '~/services';
import { Warehouse } from '~/models';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddProductToWh } from '~/common/interfaces/warehouseForm.interface';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-warehouse-products-edit',
  templateUrl: './warehouse-products-edit.component.html',
  standalone: true,
})
export class WarehouseProductsEditComponent implements OnInit {
  addProdWarehouse: FormGroup<AddProductToWh>;
  warehouses: Warehouse[] = [];

  constructor(
    private readonly whService: WarehouseService,
    private readonly toast: HotToastService
  ) {
    this.addProdWarehouse = new FormGroup({
      sku: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      quantity: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      warehouseId: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit() {
    this.whService
      .getWarehouses({ page: 0, limit: 0, sort: 'desc' })
      .subscribe({
        next: (res) => {
          this.warehouses = res.data;
        },
      });
  }

  submitForm() {
    console.log(this.addProdWarehouse);
    const { warehouseId, sku, quantity } = this.addProdWarehouse.value;
    this.whService
      .updateProdToWarehouse({
        idWh: String(warehouseId),
        sku: String(sku),
        quantity: Number(quantity),
      })
      .subscribe({
        next: () => {
          this.toast.success('Cập nhật thành công!');
          this.addProdWarehouse.reset();
        },
        error: () => {
          this.toast.error('Oops! Lỗi');
        },
      });
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
