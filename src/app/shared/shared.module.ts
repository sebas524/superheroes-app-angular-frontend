import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFound404Component } from './pages/page-not-found404/page-not-found404.component';

@NgModule({
  declarations: [PageNotFound404Component],
  imports: [CommonModule],
  exports: [PageNotFound404Component],
})
export class SharedModule {}
