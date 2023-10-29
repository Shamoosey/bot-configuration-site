import { createAction, props } from "@ngrx/store";
import { Configuration, Trigger, UpdateResult, User } from "../models";
import { DrawerView } from "../models/drawer-view";
import { ConfigurationViewMode } from "../models/configurationViewMode";
import { ManageMode } from "../models/manageMode";
import { ConfigurationUpdate } from "../models/configurationUpdate";

export const LoadConfigurations = createAction(
  '[Configurations] Load Configurations'
);

export const ManagedConfigurationIdChange = createAction(
  '[Configurations] Managed Configuration Id Change',
  props<{configurationId: string}>()
)

export const ConfigurationManangeModeChange = createAction(
  '[Configurations] Manage Mode Change',
  props<{mode: ManageMode}>()
);

export const ConfigurationViewModeChange = createAction(
  '[Configurations] View Mode Change',
  props<{mode: ConfigurationViewMode}>()
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
  props<{drawerToggle: { view: DrawerView, id?: string }}>()
);

export const SelectedConfigurationValueChange = createAction(
  "[Configurations] Selected Configuration Value Change",
  props<{updatedConfigData: ConfigurationUpdate }>()
)

export const ManagedConfigurationUpdateSubmit = createAction(
  '[Configurations] Managed Configuration Update Submit'
);

export const ConfigurationDelete = createAction(
  '[Configurations] Configuration Delete',
  props<{configurationId: string}>()
);

export const ConfigurationUpdateSuccess = createAction(
  '[Configurations] Configuration Update Success',
  props<UpdateResult>()
);

export const ConfigurationUpdateFail = createAction(
  '[Configurations] Configuration Update Fail',
  props<UpdateResult>()
);

export const TriggerRefresh = createAction(
  '[Configurations] Trigger Refresh'
);

export const TriggerRefreshSuccess = createAction(
  '[Configurations] Trigger RefreshSuccess',
  props<{triggers: Trigger[]}>()
);

export const TriggerRefreshFail = createAction(
  '[Configurations] Trigger RefreshFail',
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
  props<UpdateResult>()
);

export const TriggerUpdateFail = createAction(
  '[Configurations] Trigger Update Fail',
  props<UpdateResult>()
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
  props<UpdateResult>()
);

export const UserUpdateFail = createAction(
  '[Configurations] User Update Fail',
  props<UpdateResult>()
);

export const UserRefresh = createAction(
  '[Configurations] Users Refresh'
);

export const UserRefreshSuccess = createAction(
  '[Configurations] User Refresh Success',
  props<{users: User[]}>()
);

export const UserRefreshFail = createAction(
  '[Configurations] User Refresh Fail',
  props<{error: string}>()
);

export const NoOperation = createAction(
  '[Configurations] No Operation'
)