import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
})
export class PaginationComponent implements OnInit {
  currentPage: number = 1;
  @Input()
  totalPages: number = 0;
  listNumOfPage: number[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  private handleNavigatePage(n: number) {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { page: n },
    });
  }

  private activeCurrentPage() {
    this.route.queryParams.subscribe((params) => {
      // @ts-ignore
      const page = Number(params?.page);
      if (page !== 0) {
        this.currentPage = page;

        let tempArr: number[] = [];
        if (this.totalPages > 4) {
          [page - 2, page - 1, page, page + 1].map((e) => {
            if (e > 0 && e < this.totalPages) {
              tempArr.push(e);
            }
          });
        } else {
          tempArr = Array.from(new Array(this.totalPages).keys()).map(
            (e) => e + 1
          );
        }

        this.listNumOfPage = tempArr;
      }
    });
  }

  onClickPageNumber(page: number) {
    this.handleNavigatePage(page);
  }

  onNavigatePage(direction: 'next' | 'prev') {
    if (direction === 'next' && this.currentPage < this.totalPages) {
      this.handleNavigatePage(this.currentPage + 1);
    } else if (this.currentPage > 1) {
      this.handleNavigatePage(this.currentPage - 1);
    }
  }

  ngOnInit() {
    this.handleNavigatePage(1);
    this.activeCurrentPage();
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }
}
