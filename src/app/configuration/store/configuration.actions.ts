import { createAction, props } from "@ngrx/store";
import { Configuration } from "../models";
import { DrawerView } from "../models/drawer-view";

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
  '[Configurations] Load Managed Configuration',
  props<{configurationId: string}>()
);

export const LoadManagedConfigurationSuccess = createAction(
  '[Configurations] Load Managed Configuration Success',
  props<{configuration: Configuration}>()
);

export const LoadManagedConfigurationFail = createAction(
  '[Configurations] Load Managed Configuration Fail',
  props<{error: string}>()
);

export const DrawerViewChange = createAction(
  '[Configurations] DrawViewChange',
  props<{drawerView: DrawerView}>()
);