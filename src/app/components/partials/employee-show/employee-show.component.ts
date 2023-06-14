import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Subject } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '~/services';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '~/models';
import { takeUntil } from 'rxjs/operators';
import { CommonModule, NgForOf } from '@angular/common';
import { ConfirmModalComponent } from '~/components/shared/confirm-modal/confirm-modal.component';

@Component({
  imports: [PaginationComponent, CommonModule, NgForOf, ConfirmModalComponent],
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  standalone: true,
})
export class EmployeeShowComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private limit = 5;

  dumpElems: number[] = Array.from(new Array(this.limit).keys());

  page: number = 1;
  totalPages: number = 0;
  order: 'desc' | 'asc' = 'desc';
  destroy$ = new Subject<void>();

  isFetching: boolean = false;
  constructor(
    private readonly toast: HotToastService,
    private readonly userService: UserService,
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
        this.fetchUsers();
      });
  }

  private fetchUsers() {
    this.isFetching = true;
    this.userService
      .getUsers({
        page: this.page,
        sort: this.order,
        limit: this.limit,
      })
      .subscribe({
        next: (res) => {
          this.users = res.data;
          this.totalPages = Math.ceil(res.count / this.limit);
          this.isFetching = false;
        },
      });
  }

  onToggleOrder() {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { order: this.order },
      queryParamsHandling: 'merge',
    });
  }

  handleDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.toast.success('Xoá người dùng thành công!');
        this.fetchUsers();
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
