import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { API_URL_TOKEN, CATEGORY_NAME_RESOURCE_TOKEN, COMIC_NAME_RESOURCE_TOKEN } from './core/repositories/repository.tokens';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    { provide: COMIC_NAME_RESOURCE_TOKEN, useValue: 'comics' },
    { provide: CATEGORY_NAME_RESOURCE_TOKEN, useValue: 'categories' },
    { provide: API_URL_TOKEN, useValue: `${environment.apiURL}/api` },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
