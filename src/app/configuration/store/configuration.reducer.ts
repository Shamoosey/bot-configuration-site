import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { Configuration, Trigger, User } from "../models";
import * as ConfigurationActions from "./configuration.actions"
import * as fromRouter from '@ngrx/router-store';
import { RouterEvent } from "@angular/router";
import { DrawerView } from "../models/drawer-view";

export const configurationFeatureKey = "configuration"

export interface ConfigurationState {
  configurations: Configuration[],
  managedConfigurationId: string | null,
  managedConfiguration: Configuration | null,
  managedUsers: User[];
  managedTriggers: Trigger[];
  drawerViewState: DrawerView
}

const initialState: ConfigurationState = {
  configurations: [],
  managedConfigurationId: null,
  managedConfiguration: null,
  managedTriggers: [],
  managedUsers: [],
  drawerViewState: "none"
};

export const configurationReducer = createReducer(
  initialState,
  on(ConfigurationActions.LoadConfigurationsSuccess, (state, { configurations }) => {
    return {
      ...state,
      configurations
    }
  }),
  on(ConfigurationActions.LoadConfigurationsFail, (state) => state),
  on(ConfigurationActions.LoadManagedConfiguration, (state, { configurationId }) => {
    return {
      ...state,
      managedConfigurationId: configurationId,
      managedTriggers: [],
      managedUsers: [],
      managedConfiguration: null
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationSuccess, (state, { configuration }) => {
    return {
      ...state,
      managedConfiguration: configuration,
      managedTriggers: configuration.triggers,
      managedUsers: configuration.users
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationFail, (state, { error }) => {
    return {
      ...state
    }
  }),
  on(ConfigurationActions.DrawerViewChange, (state, { drawerView}) => {
    return {
      ...state,
      drawerViewState: drawerView
    }
  })
)

export function reducer(state: ConfigurationState | undefined, action: Action) {
  return configurationReducer(state, action);
}