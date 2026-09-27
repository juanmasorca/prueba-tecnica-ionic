import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full',
  },
  {
    path: 'catalog',
    loadChildren: () => import('./pages/catalog/catalog.module').then((m) => m.CatalogPageModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'confirmation',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/confirmation/confirmation.module').then((m) => m.ConfirmationPageModule),
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
