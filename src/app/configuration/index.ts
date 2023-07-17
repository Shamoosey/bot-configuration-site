import { ConfigurationComponent } from "./configuration.component";
import { ManageConfigurationComponent } from "./manage-configuration/manage-configuration.component";

export * from "./configuration.component";
export * from "./manage-configuration/manage-configuration.component"

export const CONFIGURATION_COMPONENTS = [
  ConfigurationComponent,
  ManageConfigurationComponent,
]