import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { AuthGuard } from './authentication/auth-guard';
import { ConfigurationComponent, EditConfigurationComponenet } from './components/configuration';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
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
