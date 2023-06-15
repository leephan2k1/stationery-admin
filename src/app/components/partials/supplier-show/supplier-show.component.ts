import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Supplier } from '~/models';
import { HotToastService } from '@ngneat/hot-toast';
import { SupplierService } from '~/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  imports: [PaginationComponent, CommonModule, ConfirmModalComponent],
  selector: 'app-supplier-show',
  templateUrl: './supplier-show.component.html',
  standalone: true,
})
export class SupplierShowComponent implements OnInit {
  private limit = 5;

  suppliers: Supplier[] = [];
  page: number = 1;
  totalPages: number = 0;
  order: 'desc' | 'asc' = 'desc';

  isFetching: boolean = false;

  constructor(
    private readonly toast: HotToastService,
    private readonly supplierService: SupplierService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onPageChange();
  }

  private onPageChange() {
    this.route.queryParams.subscribe((params) => {
      // @ts-ignore
      const page = Number(params?.page);
      // @ts-ignore
      const order = params?.order;
      if (page && page > 0) this.page = page;
      if (order) this.order = order;
      this.handleFetchingSuppliers();
    });
  }

  handleDeleteSupplier(id: string) {
    this.isFetching = true;
    this.supplierService.deleteSupplier({ id }).subscribe({
      next: () => {
        this.toast.success('Xoá nhà cung cấp thành công!');
        this.handleFetchingSuppliers();
      },
      error: () => {
        this.toast.error('Opps! Lỗi');
      },
    });
    this.isFetching = false;
  }

  private handleFetchingSuppliers() {
    this.isFetching = true;
    this.supplierService
      .getSupplier({
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (response) => {
          this.suppliers = response.data;
          this.totalPages = Math.ceil(response.count / this.limit);
          this.isFetching = false;
        },
      });
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
