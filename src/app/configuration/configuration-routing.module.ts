import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageConfigurationComponent } from './components/manage-configuration/manage-configuration.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { ManageConfigurationContainer, ViewConfigurationContainer } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ViewConfigurationContainer,
    canActivate: [AuthGuard]
  },
  {
    path: 'manage-configuration',
    component: ManageConfigurationContainer,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
