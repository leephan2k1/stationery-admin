import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowComponent } from '../product-show/product-show.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import {
  BrandService,
  CategoryService,
  SupplierService,
  UserService,
} from '~/services';
import { Category, Brand, Supplier } from '~/models';

@Component({
  imports: [CommonModule, ProductShowComponent, ProductEditComponent],
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
  standalone: true,
})
export class ProductsContainerComponent implements OnInit {
  categories: Category[] = [];
  brands: Brand[] = [];
  suppliers: Supplier[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.brandService
      .getBrands({ page: 1, limit: 0 })
      .subscribe((brandsResponse) => {
        if (brandsResponse.ok) {
          this.brands = brandsResponse.data;
        }
      });

    this.categoryService
      .getCategories({ page: 1, limit: 0 })
      .subscribe((categoryResponse) => {
        if (categoryResponse.ok) {
          this.categories = categoryResponse.data;
        }
      });

    this.supplierService
      .getCategories({ page: 1, limit: 0 })
      .subscribe((suppliersRespsonse) => {
        if (suppliersRespsonse.ok) {
          this.suppliers = suppliersRespsonse.data;
        }
      });
  }
}
