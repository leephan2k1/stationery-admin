import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ProductService } from '~/services';
import { Product } from '~/models/product.model';

@Component({
  imports: [CommonModule, PaginationComponent],
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  standalone: true,
})
export class ProductShowComponent implements OnInit {
  isFetching: boolean = false;
  dumpElems: number[] = Array.from(new Array(5).keys());
  page: number = 1;
  order: 'desc' | 'asc' = 'desc';
  products: Product[] = [];
  totalPages: number = 0;
  private limit = 2;

  constructor(private readonly prodService: ProductService) {}

  ngOnInit() {
    this.isFetching = true;
    this.prodService
      .getProducts({
        limit: this.limit,
        order: this.order,
        page: this.page,
      })
      .subscribe({
        next: (response) => {
          this.products = response.data.map((e) => {
            return {
              ...e,
              // @ts-ignore
              category: e.category.name,
              // @ts-ignore
              brand: e.brand.name,
              // @ts-ignore
              supplier: e.supplier.name,
            };
          });
          this.totalPages = Math.ceil(response.count / this.limit);
          this.isFetching = false;
        },
      });
  }
}
