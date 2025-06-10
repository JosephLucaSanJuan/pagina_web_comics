import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { API_URL_TOKEN, BACK_END_TOKEN, CATEGORIES_API_URL_TOKEN, CATEGORY_NAME_RESOURCE_TOKEN, COMIC_COVER_RESOURCE_TOKEN, COMIC_NAME_RESOURCE_TOKEN, COMIC_PROFILE_API_URL_TOKEN, COMIC_PROFILE_NAME_RESOURCE_TOKEN, COMICS_API_URL_TOKEN, IMAGE_RESOURCE_TOKEN } from './core/repositories/repository.tokens';
import { environment } from 'src/environments/environment';
import { CategoryMappingFactory, CategoryRepositoryFactory, ComicsMappingFactory, ComicsRepositoryFactory } from './core/repositories/repository.factory';
import { ComicService } from './core/services/impl/comic-service.service';
import { CategoryService } from './core/services/impl/category-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: BACK_END_TOKEN, useValue: 'strapi' },
    { provide: COMIC_NAME_RESOURCE_TOKEN, useValue: 'comics' },
    { provide: CATEGORY_NAME_RESOURCE_TOKEN, useValue: 'categories' },
    { provide: IMAGE_RESOURCE_TOKEN, useValue: 'picture' },
    { provide: COMIC_COVER_RESOURCE_TOKEN, useValue: 'cover' },
    //{ provide: COMIC_PROFILE_NAME_RESOURCE_TOKEN, useValue: 'comics/comic' },
    { provide: COMICS_API_URL_TOKEN, useValue: `${environment.apiURL}/api` },
    { provide: CATEGORIES_API_URL_TOKEN, useValue: `${environment.apiURL}/api` },
    //{ provide: COMIC_PROFILE_API_URL_TOKEN, useValue: `${environment.apiURL}/api` },
    { provide: API_URL_TOKEN, useValue: `${environment.apiURL}/api` },

    ComicsMappingFactory,
    ComicsRepositoryFactory,
    CategoryMappingFactory,
    CategoryRepositoryFactory,
    {
      provide: 'ComicService',
      useClass: ComicService
    },
    {
      provide: 'CategoryService',
      useClass: CategoryService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
