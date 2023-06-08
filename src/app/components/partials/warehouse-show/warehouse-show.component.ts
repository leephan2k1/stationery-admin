import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [PaginationComponent],
  selector: 'app-warehouse-show',
  templateUrl: './warehouse-show.component.html',
  standalone: true,
})
export class WarehouseShowComponent {}
