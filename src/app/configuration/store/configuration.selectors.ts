import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState, configurationFeatureKey } from './configuration.reducer';
import { RouterState,  } from '@angular/router';

export const configurationFeature = createFeatureSelector<ConfigurationState>(configurationFeatureKey)

export const getConfiguations = createSelector(configurationFeature, (state: ConfigurationState) => state, state => {
  return state.configurations
})

export const getSelectedConfiguration = createSelector(configurationFeature, (state: ConfigurationState) => state, state => state.selectedConfiguration)

