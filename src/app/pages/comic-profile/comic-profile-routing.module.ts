import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicProfilePage } from './comic-profile.page';

const routes: Routes = [
  /*{
    path: '',
    component: ComicProfilePage
  },*/
  {
    path: ':id',
    component: ComicProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicProfilePageRoutingModule {}
