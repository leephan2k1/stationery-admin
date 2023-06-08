import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './views/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/products/management',
    pathMatch: 'full',
  },
  {
    path: 'admin/:session/:mode',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'admin/:session',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./views/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
