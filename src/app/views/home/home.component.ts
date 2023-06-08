import { Component } from '@angular/core'; 
import { SidebarComponent } from 'src/app/components/partials/sidebar/sidebar.component';
import { ProductsContainerComponent } from 'src/app/components/partials/products-container/products-container.component';
import { ActivatedRoute } from '@angular/router';
import { BrandContainerComponent } from 'src/app/components/partials/brand-container/brand-container.component';
import { WarehouseContainerComponent } from 'src/app/components/partials/warehouse-container/warehouse-container.component';
import { CategoryContainerComponent } from 'src/app/components/partials/category-container/category-container.component';
import { HrContainerComponent } from 'src/app/components/partials/hr-container/hr-container.component'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    SidebarComponent,
    ProductsContainerComponent,
    BrandContainerComponent,
    WarehouseContainerComponent,
    CategoryContainerComponent,
    HrContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  session: string = '';

  constructor(private readonly route: ActivatedRoute) {
    route.paramMap.subscribe((val) => {
      this.session = String(val.get('session'));
    });
  }
}
