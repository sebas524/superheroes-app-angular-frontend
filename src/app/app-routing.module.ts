import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound404Component } from './shared/pages/page-not-found404/page-not-found404.component';
import { privateGuard } from './auth/guards/private.guard';
import { publicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    // * if auth status is authenticated then you cannot enter login route
    canActivate: [publicGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    // * if user is not authenticated, user cannot have access to heroes path:
    canActivate: [privateGuard],
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: '404',
    component: PageNotFound404Component,
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
