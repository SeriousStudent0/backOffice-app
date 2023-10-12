import { NgModule } from '@angular/core';
import { MenuCentersComponent } from './menu-centers/menu-centers.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginSectionComponent } from './login-section/login-section.component';

const routes: Routes = [
  {path: "login", component: LoginSectionComponent},
  {path: "logged/:id", component: MenuCentersComponent},
  {path: '', redirectTo : 'login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
