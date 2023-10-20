import { NgModule } from '@angular/core';
import { CONFIGURATION_COMPONENTS } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { CONTAINERS_COMPONENTS } from './containers';
import { ConfigurationService, StatusService, TriggerService, UserService } from './services';
import { ConfigurationEffects } from './store/configuration.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as configurationReducer from './store/configuration.reducer';

@NgModule({
  declarations: [
    ...CONFIGURATION_COMPONENTS,
    ...CONTAINERS_COMPONENTS
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature([ConfigurationEffects]),
    StoreModule.forFeature(configurationReducer.configurationFeatureKey, configurationReducer.reducer)
  ],
  providers: [
    ConfigurationService,
    TriggerService,
    UserService,
    StatusService
  ],
  exports: [
    ...CONFIGURATION_COMPONENTS,
    ...CONTAINERS_COMPONENTS
  ]
})
export class ConfigurationModule { }
