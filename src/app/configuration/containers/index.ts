import { ViewConfigurationContainer } from "./view-configuration/view-configurations.container"
import { ManageConfigurationContainer } from "./manage-configuration/manage-configuration.container"

export * from "./manage-configuration/manage-configuration.container"
export * from "./view-configuration/view-configurations.container"

export const CONTAINERS_COMPONENTS = [
  ViewConfigurationContainer,
  ManageConfigurationContainer
]