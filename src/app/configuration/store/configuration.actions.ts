import { createAction, props } from "@ngrx/store";
import { Configuration } from "../models";

export const LoadConfigurations = createAction(
  '[Configurations] Load Configurations'
);

export const LoadConfigurationsSuccess = createAction(
  '[Configurations] Load Configurations Success',
  props<{configurations: Configuration[]}>()
);

export const LoadConfigurationsFail = createAction(
  '[Configurations] Load Configurations Fail'
);

export const LoadManagedConfiguration = createAction(
  '[Configurations] Load Managed Configuration'
);

export const LoadManagedConfigurationSuccess = createAction(
  '[Configurations] Load Managed Configuration Success'
);

export const LoadManagedConfigurationFail = createAction(
  '[Configurations] Load Managed Configuration Fail'
);