import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState, configurationFeatureKey } from './configuration.reducer';

export const selectRouter = createFeatureSelector<RouterReducerState>(configurationFeatureKey);

export const {
    selectCurrentRoute, // select the current route
    selectFragment, // select the current route fragment
    selectQueryParams, // select the current route query params
    selectQueryParam, // factory function to select a query param
    selectRouteParams, // select the current route params
    selectRouteParam, // factory function to select a route param
    selectRouteData, // select the current route data
    selectUrl, // select the current url
    selectTitle, // select the title if available
} = getSelectors();


export const configurationFeature = createFeatureSelector<ConfigurationState>(configurationFeatureKey)

export const getConfiguations = createSelector(configurationFeature, (state) => state, state => {
  return state.configurations
})

export const getManagedConfiguration = createSelector(configurationFeature, (state) => state, state => state.managedConfiguration)
export const getManagedTriggers = createSelector(configurationFeature, (state) => state, state => state.managedTriggers)
export const getManagedUsers = createSelector(configurationFeature, (state) => state, state => state.managedUsers)
export const getManagedConfigurationId = createSelector(configurationFeature, (state) => state, state => state.managedConfigurationId)
export const getDrawerViewState = createSelector(configurationFeature, (state) => state, state => state.drawerViewState)

