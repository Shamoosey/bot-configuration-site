import { UserTableComponent } from "./user-table/user-table.component";
import { TriggerTableComponent } from "./trigger-table/trigger-table.component";
import { ManageUserComponent } from "./manage-user/manage-user.component";
import { ManageTriggerComponent } from "./manage-trigger/manage-trigger.component";
import { ManageConfigurationComponent } from "./manage-configuration.component";

export * from "./user-table/user-table.component"
export * from "./trigger-table/trigger-table.component"
export * from "./manage-user/manage-user.component"
export * from"./manage-trigger/manage-trigger.component"
export * from "./manage-configuration.component"

export const MANAGE_CONFIGURATION_COMPONENTS = [
  UserTableComponent,
  TriggerTableComponent,
  ManageConfigurationComponent,
  ManageUserComponent,
  ManageTriggerComponent
]