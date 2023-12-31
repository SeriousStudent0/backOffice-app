import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuCentersComponent } from './components/menu-centers/menu-centers.component';
import { CenterBoxComponent } from './components/center-box/center-box.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CenterDetailComponent } from './components/center-detail/center-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggedPageComponent } from './components/logged-page/logged-page.component';
import { CenterListComponent } from './components/center-list/center-list.component';
import { NewCenterComponent } from './components/new-center/new-center.component';
import { CenterDetailBoxComponent } from './components/center-detail-box/center-detail-box.component';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { PlanningBoxComponent } from './components/planning-box/planning-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [
    AppComponent,
    CenterBoxComponent,
    MenuCentersComponent,
    SearchBarComponent,
    CenterDetailComponent,
    UserDetailComponent,
    UserListComponent,
    LoginSectionComponent,
    LoggedPageComponent,
    CenterListComponent,
    NewCenterComponent,
    CenterDetailBoxComponent,
    PlanningBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    CdkAccordionModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
