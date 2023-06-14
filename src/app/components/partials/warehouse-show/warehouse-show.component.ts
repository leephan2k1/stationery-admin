import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { WarehouseService } from '~/services';
import { Warehouse } from '~/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CommonModule, NgForOf } from '@angular/common';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';

@Component({
  imports: [PaginationComponent, NgForOf, CommonModule, ConfirmModalComponent],
  selector: 'app-warehouse-show',
  templateUrl: './warehouse-show.component.html',
  standalone: true,
})
export class WarehouseShowComponent implements OnInit, OnDestroy {
  private limit = 5;

  warehouses: Warehouse[] = [];
  dumpElems: number[] = Array.from(new Array(this.limit).keys());

  page: number = 1;
  totalPages: number = 0;
  order: 'desc' | 'asc' = 'desc';
  destroy$ = new Subject<void>();

  isFetching: boolean = false;

  constructor(
    private readonly toast: HotToastService,
    private readonly warehouseService: WarehouseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onPageChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { order: this.order },
      queryParamsHandling: 'merge',
    });
  }

  private onPageChange() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        // @ts-ignore
        const page = Number(params?.page);
        // @ts-ignore
        const order = params?.order;
        if (page && page > 0) this.page = page;
        if (order) this.order = order;
        this.handleFetchingWarehouses();
      });
  }

  handleDeleteWarehouse(id: string) {
    this.isFetching = true;
    this.warehouseService
      .deleteWarehouse(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.success('Xoá kho thành công!');
          this.handleFetchingWarehouses();
        },
        error: () => {
          this.toast.error('Opps! Lỗi');
        },
      });
    this.isFetching = false;
  }

  private handleFetchingWarehouses() {
    this.isFetching = true;
    this.warehouseService
      .getWarehouses({
        page: this.page,
        sort: this.order,
        limit: this.limit,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.warehouses = response.data;
          this.totalPages = Math.ceil(response.count / this.limit);
          this.isFetching = false;
        },
      });
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
