import {RouterModule, Routes} from "@angular/router";
import {LoginGuard} from "./guards/login.guard";
import {HomeComponent} from "./components/home/home.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'error-page',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '/error-page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
