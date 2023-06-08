import { Component } from '@angular/core';
import { SupplierEditComponent } from '../supplier-edit/supplier-edit.component';
import { SupplierShowComponent } from '../supplier-show/supplier-show.component';

@Component({
  imports: [SupplierEditComponent, SupplierShowComponent],
  selector: 'app-supplier-container',
  templateUrl: './supplier-container.component.html',
  standalone: true,
})
export class SupplierContainerComponent {}
