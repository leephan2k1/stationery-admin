import { Subject } from 'rxjs';
import {
    BrandContainerComponent
} from 'src/app/components/partials/brand-container/brand-container.component';
import {
    CategoryContainerComponent
} from 'src/app/components/partials/category-container/category-container.component';
import {
    HrContainerComponent
} from 'src/app/components/partials/hr-container/hr-container.component';
import {
    ProductsContainerComponent
} from 'src/app/components/partials/products-container/products-container.component';
import { SidebarComponent } from 'src/app/components/partials/sidebar/sidebar.component';
import {
    SupplierContainerComponent
} from 'src/app/components/partials/supplier-container/supplier-container.component';
import {
    WarehouseContainerComponent
} from 'src/app/components/partials/warehouse-container/warehouse-container.component';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
    SupplierContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  session: string = '';
  destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    route.paramMap.subscribe((val) => {
      this.session = String(val.get('session'));
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.userService.isAuthenticated
    .pipe(takeUntil(this.destroy$))
    .subscribe((isAuth) => {
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
    });
  }
}
