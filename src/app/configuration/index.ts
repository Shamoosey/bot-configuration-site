import { ConfigurationComponent } from "./configuration.component";
import { ManageConfigurationComponent } from "./manage-configuration/manage-configuration.component";
import { ManageTriggerComponent } from "./manage-configuration/manage-trigger/manage-trigger.component";

export * from "./configuration.component";
export * from "./manage-configuration/manage-configuration.component"

export const CONFIGURATION_COMPONENTS = [
  ConfigurationComponent,
  ManageConfigurationComponent,
  ManageTriggerComponent
]