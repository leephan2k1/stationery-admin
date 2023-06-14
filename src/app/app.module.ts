import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EMPTY } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import {
  BrandService,
  CategoryService,
  ProductService,
  SupplierService,
  UserService,
  WarehouseService,
} from './services';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
    BrandService,
    WarehouseService,
    CategoryService,
    SupplierService,
    ProductService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => {
        return () =>
          userService.getCurrentUser().subscribe({
            next: (user) => user.data,
            error: () => EMPTY,
          });
      },
      deps: [UserService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor, //config base url
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
