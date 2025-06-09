import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComicsPage } from './comics.page';
import { ComicProfilePage } from '../comic-profile/comic-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ComicsPage
  },
  {
    path: ':id',
    component: ComicProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsPageRoutingModule {}
