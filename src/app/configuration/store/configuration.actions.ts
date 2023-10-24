import { createAction, props } from "@ngrx/store";
import { Configuration, Trigger, User } from "../models";
import { DrawerView } from "../models/drawer-view";
import { UpdateType } from "../models/updateType";

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
  props<{drawer: { view: DrawerView, id?: string }}>()
);

export const ConfigurationCreate = createAction(
  '[Configurations] Configuration Create',
  props<{configuration: Configuration}>()
);

export const ConfigurationEdit = createAction(
  '[Configurations] Configuration Edit',
  props<{configuration: Configuration}>()
);

export const ConfigurationDelete = createAction(
  '[Configurations] Configuration Delete',
  props<{configurationId: string}>()
);

export const ConfigurationUpdateSuccess = createAction(
  '[Configurations] Configuration Update Success',
);

export const ConfigurationUpdateFail = createAction(
  '[Configurations] Configuration Update Fail',
  props<{error: string}>()
);

export const TriggerCreate = createAction(
  '[Configurations] Trigger Create',
  props<{trigger: Trigger}>()
);

export const TriggerEdit = createAction(
  '[Configurations] Trigger Edit',
  props<{trigger: Trigger}>()
);

export const TriggerDelete = createAction(
  '[Configurations] Trigger Delete',
  props<{triggerId: string}>()
);

export const TriggerUpdateSuccess = createAction(
  '[Configurations] Trigger Update Success',
);

export const TriggerUpdateFail = createAction(
  '[Configurations] Trigger Update Fail',
  props<{error: string}>()
);

export const UserCreate = createAction(
  '[Configurations] User Create',
  props<{user: User}>()
);

export const UserEdit = createAction(
  '[Configurations] User Edit',
  props<{user: User}>()
);

export const UserDelete = createAction(
  '[Configurations] User Delete',
  props<{userId: string}>()
);

export const UserUpdateSuccess = createAction(
  '[Configurations] User Update Success',
  props<{updateType: UpdateType}>
);

export const UserUpdateFail = createAction(
  '[Configurations] User Update Fail',
  props<{error: string}>()
);