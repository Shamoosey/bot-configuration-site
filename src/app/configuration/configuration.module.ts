import { NgModule } from '@angular/core';
import { CONFIGURATION_COMPONENTS } from '.';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';

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
