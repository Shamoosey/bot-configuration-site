import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/assets/material.module';
import { SHARED_COMPONENTS } from '../shared';
import { RouterModule } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';
import { TriggerService } from './services/trigger.service';
import { StatusService } from './services/status.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    RouterModule,
  ],
  providers: [
    ConfigurationService,
    TriggerService,
    UserService,
    StatusService
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
