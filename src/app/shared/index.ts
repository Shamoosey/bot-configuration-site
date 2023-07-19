import { DialogComponent } from "./components/dialog-component/dialog.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { TriggerTableComponent } from "./components/trigger-table/trigger-table.component";
import { UserTableComponent } from "./components/user-table/user-table.component";

export * from "./components/dialog-component/dialog.component"
export * from "./components/loading-spinner/loading-spinner.component";
export * from "./components/trigger-table/trigger-table.component";
export * from "./components/user-table/user-table.component";

export const SHARED_COMPONENTS = [
  LoadingSpinnerComponent,
  DialogComponent,
  UserTableComponent,
  TriggerTableComponent
]