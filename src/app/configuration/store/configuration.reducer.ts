import { Action, createReducer, on } from "@ngrx/store";
import { Configuration, Trigger, User } from "../models";
import * as ConfigurationActions from "./configuration.actions"
import * as fromRouter from '@ngrx/router-store';
import { DrawerView } from "../models/drawer-view";
import { ManageMode } from "../models/manageMode";
import { ConfigurationViewMode } from "../models/configurationViewMode";

export const configurationFeatureKey = "configuration"

export interface ConfigurationState {
  configurations: Configuration[] | null,
  managedConfigurationId: string | null,
  managedConfiguration: Configuration | null,
  managedUsers: User[];
  selectedUser: User | null;
  managedTriggers: Trigger[];
  selectedTrigger: Trigger | null;
  drawerViewState: DrawerView
  configurationManageMode: ManageMode,
  triggerManageMode: ManageMode,
  userManageMode: ManageMode,
  configurationViewMode: ConfigurationViewMode
}

const initialState: ConfigurationState = {
  configurations: null,
  managedConfigurationId: null,
  managedConfiguration: null,
  managedTriggers: [],
  managedUsers: [],
  selectedTrigger: null,
  selectedUser: null,
  drawerViewState: "none",
  configurationManageMode: "create",
  triggerManageMode: "create",
  userManageMode: "create",
  configurationViewMode: "view"
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
      managedConfiguration: null,
      configurationManageMode: (configurationId == null ? "create" : "edit") as ManageMode
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationSuccess, (state, { configuration }) => {
    return {
      ...state,
      managedConfiguration: configuration,
      managedTriggers: configuration.triggers,
      managedUsers: configuration.users,
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationFail, (state, { error }) => {
    return {
      ...state
    }
  }),
  on(ConfigurationActions.ConfigurationViewModeChange, (state, { mode }) => {
    return {
      ...state,
      configurationViewMode: mode
    }
  }),
  on(ConfigurationActions.ConfigurationManangeModeChange, (state, { mode }) => {
    return {
      ...state,
      configurationManageMode: mode
    }
  }),
  on(ConfigurationActions.DrawerViewChange, (state, { drawerToggle }) => {
    let selectedUser = null;
    let selectedTrigger = null;

    if(drawerToggle.view == "user"){
      const selectedUserIndex = state.managedUsers.findIndex(x => x.id == drawerToggle.id)
      if(selectedUserIndex > -1){
        selectedUser = state.managedUsers[selectedUserIndex];
      }
    } else if (drawerToggle.view == "trigger") {
      const selectedTriggerIndex = state.managedTriggers.findIndex(x => x.id == drawerToggle.id)
      if(selectedTriggerIndex > -1){
        selectedTrigger = state.managedTriggers[selectedTriggerIndex];
      }
    }

    return {
      ...state,
      drawerViewState: drawerToggle.view,
      selectedTrigger: selectedTrigger,
      selectedUser: selectedUser,
      userManageMode: (selectedUser == null ? "create" : "edit") as ManageMode,
      triggerManageMode: (selectedTrigger == null ? "create" : "edit") as ManageMode,
      configurationViewMode: "view" as ConfigurationViewMode 
    }
  }),
  on(ConfigurationActions.TriggerRefreshSuccess, (state, { triggers }) => {
    return {
      ...state,
      managedTriggers: triggers
    }
  }),
  on(ConfigurationActions.UserRefreshSuccess, (state, { users }) => {
    return {
      ...state,
      managedUsers: users
    }
  })
)

export function reducer(state: ConfigurationState | undefined, action: Action) {
  return configurationReducer(state, action);
}