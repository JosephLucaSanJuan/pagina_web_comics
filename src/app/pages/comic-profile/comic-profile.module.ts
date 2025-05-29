import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComicProfilePageRoutingModule } from './comic-profile-routing.module';
import { ComicProfilePage } from './comic-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComicProfilePageRoutingModule
  ],
  declarations: [ComicProfilePage]
})
export class ComicProfilePageModule {}
