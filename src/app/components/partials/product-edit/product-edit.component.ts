import { Component, Input, OnDestroy } from '@angular/core';
import { Brand, Category, Supplier } from '~/models';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  productBookProperties,
  productToyProperties,
  productStationery,
} from '~/common/constants/product-properties';
import { ProductForm } from '~/common/interfaces/productForm.interface';
import { ProductType } from '~/common/interfaces/product-type.interface';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductService } from '~/services';
import { Product } from '~/models/product.model';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  standalone: true,
})
export class ProductEditComponent implements OnDestroy {
  isSubmitting: boolean = false;
  destroy$ = new Subject<void>();
  productTypes: string[] = ['Sách', 'Đồ chơi', 'Dụng cụ học sinh'];
  productSelections: ProductType[] = productBookProperties;
  productForm: FormGroup<ProductForm>;

  @Input()
  categories?: Category[];
  @Input()
  brands?: Brand[];
  @Input()
  suppliers?: Supplier[];

  constructor(
    private readonly toast: HotToastService,
    private readonly prodService: ProductService
  ) {
    this.productForm = new FormGroup<ProductForm>({
      brand: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      category: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      discount_percent: new FormControl(0, {
        validators: [Validators.required, Validators.max(100)],
        nonNullable: true,
      }),
      price: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      size: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      supplier: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      thumbnail: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      weight: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
    this.setDynamicProperties();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByFn(index: number, item: any) {
    return item?.id || index;
  }

  submitForm() {
    this.toast.success('Lưu sản phẩm thành công!');
    //fake image url:
    this.productForm.value.thumbnail =
      'https://cdn0.fahasa.com/media/catalog/product/g/i/gia-_nh-dz_n-ho_b_a.jpg';

    this.prodService
      .createProduct({
        ...this.productForm.value,
        //fake image urls:
        images: [
          'https://cdn0.fahasa.com/media/catalog/product/g/i/gia-_nh-dz_n-ho_b_a.jpg',
          'https://cdn0.fahasa.com/media/catalog/product/g/i/gia-_nh-dz_n-ho_b_a.jpg',
        ],
      } as Product)
      .subscribe({
        error: () => {
          this.toast.error('Oops! Có lỗi xảy ra, thử lại sau');
        },
      });

    this.productForm.reset();
  }

  private setDynamicProperties() {
    const propertiesForm = {};
    this.productSelections.forEach((e) => {
      // @ts-ignore
      propertiesForm[e.value] = new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      });
    });

    // @ts-ignore
    this.productForm.setControl(
      'specific_properties',
      new FormGroup(propertiesForm)
    );
  }

  handleChangeProdType($event: any) {
    switch ($event.target.value) {
      case 'Sách':
        this.productSelections = productBookProperties;
        break;
      case 'Đồ chơi':
        this.productSelections = productToyProperties;
        break;
      case 'Dụng cụ học sinh':
        this.productSelections = productStationery;
        break;
    }
    this.setDynamicProperties();
  }
}
