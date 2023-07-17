import { ConfigurationComponent } from "./configuration.component";
import { TriggerTableComponent } from "./manage-configuration/trigger-table/trigger-table.component";
import { ManageConfigurationComponent } from "./manage-configuration/manage-configuration.component";
import { UserTableComponent } from "./manage-configuration/user-table/user-table.component";

export * from "./configuration.component";
export * from "./manage-configuration/manage-configuration.component"
export * from "./manage-configuration/trigger-table/trigger-table.component"
export * from "./manage-configuration/user-table/user-table.component"

export const CONFIGURATION_COMPONENTS = [
  ConfigurationComponent,
  ManageConfigurationComponent,
  TriggerTableComponent,
  UserTableComponent
]