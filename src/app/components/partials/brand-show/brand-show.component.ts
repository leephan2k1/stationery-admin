import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { HotToastService } from '@ngneat/hot-toast';
import { BrandService } from '~/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '~/models';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';

@Component({
  imports: [PaginationComponent, CommonModule, ConfirmModalComponent],
  selector: 'app-brand-show',
  templateUrl: './brand-show.component.html',
  standalone: true,
})
export class BrandShowComponent implements OnInit {
  private limit = 5;

  brands: Brand[] = [];
  page: number = 1;
  totalPages: number = 0;
  order: 'desc' | 'asc' = 'desc';

  isFetching: boolean = false;

  constructor(
    private readonly toast: HotToastService,
    private readonly brandService: BrandService,
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
      this.handleFetchingBrands();
    });
  }

  handleDeleteBrand(id: string) {
    this.brandService.deleteBrand(id).subscribe({
      next: () => {
        this.toast.success('Xoá thành công!');
        this.handleFetchingBrands();
      },
      error: () => {
        this.toast.error('Xoá thất bại, thử lại sau!');
      },
    });
  }

  private handleFetchingBrands() {
    this.isFetching = true;
    this.brandService
      .getBrands({
        page: this.page,
        limit: this.limit,
      })
      .subscribe({
        next: (response) => {
          this.brands = response.data;
          this.totalPages = Math.ceil(response.count / this.limit);
          this.isFetching = false;
        },
      });
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
