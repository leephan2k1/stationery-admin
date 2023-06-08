import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [PaginationComponent],
  selector: 'app-supplier-show',
  templateUrl: './supplier-show.component.html',
  standalone: true,
})
export class SupplierShowComponent {}
