import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [CommonModule, PaginationComponent],
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  standalone: true,
})
export class ProductShowComponent {}
