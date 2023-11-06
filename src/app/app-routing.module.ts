import { NgModule } from '@angular/core';
import { MenuCentersComponent } from './components/menu-centers/menu-centers.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { LoggedPageComponent } from './components/logged-page/logged-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginSectionComponent},
  {path: "logged/:id", component: LoggedPageComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo : 'login', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
