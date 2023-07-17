import { NgModule } from '@angular/core';
import { CONFIGURATION_COMPONENTS } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/assets/material.module';
import { ConfigurationService } from '../shared/services/configuration.service';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ...CONFIGURATION_COMPONENTS,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [],
  exports: [
    ...CONFIGURATION_COMPONENTS
  ]
})
export class ConfigurationModule { }
