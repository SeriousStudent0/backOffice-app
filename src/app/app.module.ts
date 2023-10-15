import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuCentersComponent } from './menu-centers/menu-centers.component';
import { CenterBoxComponent } from './center-box/center-box.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginSectionComponent } from './login-section/login-section.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggedPageComponent } from './logged-page/logged-page.component';
import { CenterListComponent } from './center-list/center-list.component';
import { NewCenterComponent } from './new-center/new-center.component';

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
    NewCenterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
