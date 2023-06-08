import { Component } from '@angular/core';
import { WarehouseShowComponent } from '../warehouse-show/warehouse-show.component';
import { WarehouseEditComponent } from '../warehouse-edit/warehouse-edit.component';
import { WarehouseProductsEditComponent } from '../warehouse-products-edit/warehouse-products-edit.component';

@Component({
  imports: [
    WarehouseShowComponent,
    WarehouseEditComponent,
    WarehouseProductsEditComponent,
  ],
  selector: 'app-warehouse-container',
  templateUrl: './warehouse-container.component.html',
  standalone: true,
})
export class WarehouseContainerComponent {}
