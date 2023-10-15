import { NgModule } from '@angular/core';
import { MenuCentersComponent } from './menu-centers/menu-centers.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginSectionComponent } from './login-section/login-section.component';
import { LoggedPageComponent } from './logged-page/logged-page.component';

const routes: Routes = [
  {path: "login", component: LoginSectionComponent},
  {path: "logged/:id", component: LoggedPageComponent},
  {path: '', redirectTo : 'login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
