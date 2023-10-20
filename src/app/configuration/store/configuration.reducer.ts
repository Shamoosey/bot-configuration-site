import { Action, createReducer, on } from "@ngrx/store";
import { Configuration, Trigger, User } from "../models";
import * as ConfigurationActions from "./configuration.actions"

export const configurationFeatureKey = "configuration"

export interface ConfigurationState {
  configurations: Configuration[];
  selectedConfiguration: Configuration | null,
  managedUsers: User[];
  managedTriggers: Trigger[];
}

const initialState: ConfigurationState = {
  configurations: [],
  selectedConfiguration: null,
  managedTriggers: [],
  managedUsers: []
};


export const configurationReducer = createReducer(
  initialState,
  on(ConfigurationActions.LoadConfigurations, (state) => state),
  on(ConfigurationActions.LoadConfigurationsSuccess, (state, { configurations }) => {
    return {
      ...state,
      configurations
    }
  }),
  on(ConfigurationActions.LoadConfigurationsFail, (state) => state),
)

export function reducer(state: ConfigurationState | undefined, action: Action) {
  return configurationReducer(state, action);
}