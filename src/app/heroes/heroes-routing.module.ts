import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesLayoutPageComponent } from './pages/heroes-layout-page/heroes-layout-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { HeroSearchPageComponent } from './pages/hero-search-page/hero-search-page.component';
import { HeroListPageComponent } from './pages/hero-list-page/hero-list-page.component';
import { HeroMainPageComponent } from './pages/hero-main-page/hero-main-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesLayoutPageComponent,
    children: [
      {
        path: 'new-hero',
        component: NewHeroPageComponent,
      },
      {
        path: 'search',
        component: HeroSearchPageComponent,
      },
      {
        path: 'edit/:id',
        component: NewHeroPageComponent,
      },
      {
        path: 'list',
        component: HeroListPageComponent,
      },
      {
        // ! make sure this path is always last because if not it will come into conflict with the ones above!!!
        path: ':id',
        component: HeroMainPageComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
