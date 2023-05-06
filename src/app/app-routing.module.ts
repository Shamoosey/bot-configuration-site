import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './authentication/auth-guard';
import { EditConfigurationComponenet } from './components/edit-configuration/edit-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-configuration',
    component: EditConfigurationComponenet,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginScreenComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
