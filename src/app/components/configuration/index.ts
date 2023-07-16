import { EditConfigurationComponenet } from "./edit-configuration/edit-configuration.component";
import { ConfigurationComponent } from "./configuration.component";
import { TriggerTableComponent } from "./create-configuration/trigger-table/trigger-table.component";
import { CreateConfigurationComponenet } from "./create-configuration/create-configuration.component";
import { UserTableComponent } from "./create-configuration/user-table/user-table.component";

export * from "./configuration.component";
export * from "./create-configuration/create-configuration.component"
export * from "./create-configuration/trigger-table/trigger-table.component"
export * from "./create-configuration/user-table/user-table.component"
export * from "./edit-configuration/edit-configuration.component"

export const CONFIGURATION_COMPONENTS = [
  EditConfigurationComponenet,
  ConfigurationComponent,
  CreateConfigurationComponenet,
  TriggerTableComponent,
  UserTableComponent
]