import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { SHARED_COMPONENTS } from '../shared';
import { RouterModule } from '@angular/router';
import { ConfigurationService } from './services/configuration.service';
import { TriggerService } from './services/trigger.service';
import { StatusService } from './services/status.service';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    CommonModule,
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
