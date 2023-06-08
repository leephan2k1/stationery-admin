import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShowComponent } from '../product-show/product-show.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  imports: [CommonModule, ProductShowComponent, ProductEditComponent],
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
  standalone: true,
})
export class ProductsContainerComponent {
  constructor() {}
}
