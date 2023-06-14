import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '~/services';
import { Warehouse } from '~/models';

@Component({
  selector: 'app-warehouse-products-edit',
  templateUrl: './warehouse-products-edit.component.html',
  standalone: true,
})
export class WarehouseProductsEditComponent implements OnInit {
  warehouses: Warehouse[] = [];
  constructor(private readonly whService: WarehouseService) {}

  ngOnInit() {}
}
