import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { ComicsPage } from '../comics/comics.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: ':id',
    component: ComicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
