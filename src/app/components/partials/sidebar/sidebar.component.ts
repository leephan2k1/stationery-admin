import { Component } from '@angular/core';
import { GuardIconComponent } from '../../icons/guard-icon/guard-icon.component';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { CategoryIconComponent } from '../../icons/category-icon/category-icon.component';
import { BrandCakeIconComponent } from '../../icons/brand-cake-icon/brand-cake-icon.component';
import { StreamlineComponent } from '../../icons/streamline/streamline.component';
import { WarehouseIconComponent } from '../../icons/warehouse-icon/warehouse-icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    GuardIconComponent,
    SidebarItemComponent,
    CategoryIconComponent,
    BrandCakeIconComponent,
    StreamlineComponent,
    WarehouseIconComponent
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
})
export class SidebarComponent {}
