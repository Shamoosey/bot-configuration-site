import { Action, createReducer, on } from "@ngrx/store";
import { Configuration, Trigger, User } from "../models";
import * as ConfigurationActions from "./configuration.actions"
import * as fromRouter from '@ngrx/router-store';
import { DrawerView } from "../models/drawer-view";

export const configurationFeatureKey = "configuration"

export interface ConfigurationState {
  configurations: Configuration[],
  managedConfigurationId: string | null,
  managedConfiguration: Configuration | null,
  managedUsers: User[];
  managedTriggers: Trigger[];
  selectedUserId: string | null;
  selectedTriggerId: string | null;
  drawerViewState: DrawerView
}

const initialState: ConfigurationState = {
  configurations: [],
  managedConfigurationId: null,
  managedConfiguration: null,
  managedTriggers: [],
  managedUsers: [],
  selectedTriggerId: null,
  selectedUserId: null,
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
  on(ConfigurationActions.DrawerViewChange, (state, { drawer }) => {
    let selectedTriggerId = null;
    let selectedUserId = null;

    if(drawer.view == "user"){
      selectedUserId= drawer.id;
    } else if (drawer.view == "trigger") {
      selectedTriggerId = drawer.id;
    }

    return {
      ...state,
      drawerViewState: drawer.view,
      selectedTriggerId,
      selectedUserId
    }
  }),
)

export function reducer(state: ConfigurationState | undefined, action: Action) {
  return configurationReducer(state, action);
}