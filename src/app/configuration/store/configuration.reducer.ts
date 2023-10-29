import { Action, createReducer, on } from "@ngrx/store";
import * as ConfigurationActions from "./configuration.actions"
import { Configuration, Trigger, User } from "bot-configuration-types"
import { DrawerView } from "../models/drawer-view";
import { ManageMode } from "../models/manageMode";
import { ConfigurationViewMode } from "../models/configurationViewMode";

export const configurationFeatureKey = "configuration"

export interface ConfigurationState {
  configurations: Configuration[],
  managedConfiguration: Configuration | null,
  editedManagedConfiguration: Configuration | null;
  managedConfigurationId: string | null,
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
  configurations: [],
  managedConfiguration: null,
  editedManagedConfiguration: null,
  managedConfigurationId: null,
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
  on(ConfigurationActions.ManagedConfigurationIdChange, (state, { configurationId }) => {
    return {
      ...state,
      managedConfigurationId: configurationId,
      configurationViewMode: (configurationId == null ? "edit" : "view") as ConfigurationViewMode,
    }
  }),
  on(ConfigurationActions.LoadConfigurationsSuccess, (state, { configurations }) => {
    return {
      ...state,
      configurations
    }
  }),
  on(ConfigurationActions.LoadConfigurationsFail, (state) => {
    return {
      ...state,
      configurations: [],
      configurationViewMode: "view" as ConfigurationViewMode,
    }
  }),
  on(ConfigurationActions.LoadManagedConfiguration, (state, { configurationId }) => {
    return {
      ...state,
      managedTriggers: [],
      managedUsers: [],
      managedConfiguration: null,
      editedManagedConfiguration: null,
      configurationManageMode: (configurationId == null ? "create" : "edit") as ManageMode
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationSuccess, (state, { configuration }) => {
    const loadedConfigs = [...state.configurations]

    const foundIndex = loadedConfigs.findIndex(x => x.id == configuration.id)
    if(foundIndex > -1){
      loadedConfigs.splice(foundIndex, 1, configuration)
    }

    return {
      ...state,
      configurations: loadedConfigs,
      managedConfiguration: configuration,
      editedManagedConfiguration: configuration,
      managedTriggers: configuration.triggers,
      managedUsers: configuration.users,
    }
  }),
  on(ConfigurationActions.LoadManagedConfigurationFail, (state, { error }) => {
    return {
      ...state,
      managedConfigurationId: null,
      managedConfiguration: null,
      selectedTrigger: null,
      selectedUser: null,
      configurationViewMode: "edit" as ConfigurationViewMode,
      configurationManageMode: "create" as ManageMode,
      managedUsers: [],
      managedTriggers: [],
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
  }),
  on(ConfigurationActions.SelectedConfigurationValueChange, (state,{ updatedConfigData }) => {
    return {
      ...state,
      editedManagedConfiguration: {
        ...updatedConfigData
      } as Configuration
    }
  })
)

export function reducer(state: ConfigurationState | undefined, action: Action) {
  return configurationReducer(state, action);
}