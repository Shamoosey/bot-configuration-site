import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/authentication/auth-guard';
import { ConfigurationComponent } from './configuration.component';
import { ManageConfigurationComponent } from './manage-configuration/manage-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-configuration',
    component: ManageConfigurationComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
