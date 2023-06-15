import { Component, OnInit } from '@angular/core';
import { GuardIconComponent } from '../../icons/guard-icon/guard-icon.component';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { CategoryIconComponent } from '../../icons/category-icon/category-icon.component';
import { BrandCakeIconComponent } from '../../icons/brand-cake-icon/brand-cake-icon.component';
import { StreamlineComponent } from '../../icons/streamline/streamline.component';
import { WarehouseIconComponent } from '../../icons/warehouse-icon/warehouse-icon.component';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '~/services';
import { User } from '~/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    GuardIconComponent,
    SidebarItemComponent,
    CategoryIconComponent,
    BrandCakeIconComponent,
    StreamlineComponent,
    WarehouseIconComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
})
export class SidebarComponent implements OnInit {
  session: string = '';
  mode: string = '';
  user: User | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => {
      this.session = String(value.get('session'));
      this.mode = String(value.get('mode'));
    });

    this.userService.currentUser.subscribe({
      next: (value) => {
        this.user = value;
      },
    });
  }

  get isProductSession(): boolean {
    return this.session === 'products';
  }

  handleLogout() {
    this.userService.logout();
  }
}
