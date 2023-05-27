import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesLayoutPageComponent } from './pages/heroes-layout-page/heroes-layout-page.component';
import { HeroListPageComponent } from './pages/hero-list-page/hero-list-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { HeroSearchPageComponent } from './pages/hero-search-page/hero-search-page.component';
import { HeroMainPageComponent } from './pages/hero-main-page/hero-main-page.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeroesLayoutPageComponent,
    HeroListPageComponent,
    NewHeroPageComponent,
    HeroSearchPageComponent,
    HeroMainPageComponent,
  ],
  imports: [CommonModule, HeroesRoutingModule, MaterialModule],
})
export class HeroesModule {}
