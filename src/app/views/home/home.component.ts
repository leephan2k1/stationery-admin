import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/components/partials/sidebar/sidebar.component';
import { ProductsContainerComponent } from 'src/app/components/partials/products-container/products-container.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, ProductsContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  
}
