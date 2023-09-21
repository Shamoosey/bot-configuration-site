import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './core';

const routes: Routes = [
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomeScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
