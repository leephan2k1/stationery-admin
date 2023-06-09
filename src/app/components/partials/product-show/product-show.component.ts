import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ProductService } from '~/services';
import { Product } from '~/models/product.model';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '~/components/shared/input/input.component';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  imports: [
    CommonModule,
    PaginationComponent,
    FormsModule,
    InputComponent,
    ConfirmModalComponent,
  ],
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  standalone: true,
})
export class ProductShowComponent implements OnInit, OnDestroy {
  private limit: number = 5;

  isFetching: boolean = false;
  dumpElems: number[] = Array.from(new Array(this.limit).keys());

  page: number = 1;
  order: 'desc' | 'asc' = 'desc';
  totalPages: number = 0;
  destroy$ = new Subject<void>();

  products: Product[] = [];

  private isCached = false;
  private productsCached: Product[] = [];
  private totalPagesCached: number = 0;
  searchTerm: string = '';

  constructor(
    private readonly toast: HotToastService,
    private readonly prodService: ProductService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.onPageChange();
  }

  onToggleOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { order: this.order },
      queryParamsHandling: 'merge',
    });
  }

  onSearchName(term: string) {
    this.searchTerm = term.trim();
    if (term) {
      if (!this.isCached) {
        this.productsCached = [...this.products];
        this.totalPagesCached = this.totalPages;
        this.isCached = true;
      }
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: { page: 1 },
        queryParamsHandling: 'merge',
      });
      this.handleFetchingProds();
    } else if (term === '') {
      this.products = [...this.productsCached];
      this.totalPages = this.totalPagesCached;
      this.isCached = false;
    }
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
        this.handleFetchingProds();
      });
  }

  handleFetchingProds() {
    this.isFetching = true;
    this.prodService
      .getProducts({
        name: this.searchTerm,
        limit: this.limit,
        sort: this.order,
        page: this.page,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = response.data.map((e) => {
            return {
              ...e,
              // @ts-ignore
              category: e?.category?.name || '',
              // @ts-ignore
              brand: e?.brand?.name || '',
              // @ts-ignore
              supplier: e?.supplier?.name || '',
            };
          });
          this.totalPages = Math.ceil(response.count / this.limit);
          this.isFetching = false;
        },
      });
  }

  handleDeleteProduct(prodSlug: string) {
    this.prodService
      .deleteProduct(prodSlug)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toast.success('Xoá thành công!');
          //refresh products
          this.handleFetchingProds();
        },
        error: () => {
          this.toast.error('Oops! Xảy ra lỗi, thử lại sau!');
        },
      });
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
