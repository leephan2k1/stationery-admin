import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Subject } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '~/services';
import { Category } from '~/models';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';

@Component({
  imports: [
    PaginationComponent,
    CommonModule,
    PaginationComponent,
    ConfirmModalComponent,
  ],
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  standalone: true,
})
export class CategoryShowComponent implements OnInit, OnDestroy {
  private limit = 5;
  categories: Category[] = [];

  page: number = 1;
  totalPages: number = 0;
  order: 'desc' | 'asc' = 'desc';
  destroy$ = new Subject<void>();

  isFetching: boolean = false;

  constructor(
    private readonly toast: HotToastService,
    private readonly categoryService: CategoryService,
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

  private fetchingCategories() {
    this.isFetching = true;
    this.categoryService
      .getCategories({ page: this.page, limit: this.limit })
      .subscribe({
        next: (res) => {
          this.categories = res.data;
          this.isFetching = false;
        },
      });
  }

  handleDeleteCategory(slug: string) {
    console.log(slug);
    this.categoryService.deleteCategory(slug).subscribe({
      next: () => {
        this.toast.success('Xoá thành công');
        this.fetchingCategories();
      },
      error: () => {
        this.toast.error('Xoá thất bại!');
      },
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
        this.fetchingCategories();
      });
  }
}
