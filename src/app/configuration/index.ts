import { ConfigurationComponent } from "./configuration.component";
import { ManageConfigurationComponent } from "./manage-configuration/manage-configuration.component";
import { ManageTriggerComponent } from "./manage-configuration/manage-trigger/manage-trigger.component";
import { ManageUserComponent } from "./manage-configuration/manage-user/manage-user.component";

export * from "./configuration.component";
export * from "./manage-configuration/manage-configuration.component"
export * from "./manage-configuration/manage-trigger/manage-trigger.component";
export * from "./manage-configuration/manage-user/manage-user.component";

export const CONFIGURATION_COMPONENTS = [
  ConfigurationComponent,
  ManageConfigurationComponent,
  ManageTriggerComponent,
  ManageUserComponent
]