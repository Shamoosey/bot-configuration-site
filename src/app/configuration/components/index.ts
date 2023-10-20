import { MANAGE_CONFIGURATION_COMPONENTS } from "./manage-configuration";
import { ViewConfigurationComponent } from "./view-configurations/view-configuration.component";

export * from "./view-configurations/view-configuration.component";

export const CONFIGURATION_COMPONENTS = [
  ViewConfigurationComponent,
  ...MANAGE_CONFIGURATION_COMPONENTS
]