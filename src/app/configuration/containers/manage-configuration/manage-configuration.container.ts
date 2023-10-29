import { Component, OnInit } from "@angular/core";
import { ConfigurationState } from "../../store/configuration.reducer";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Configuration, Trigger, User } from "../../models";
import { ConfigurationActions, ConfigurationSelectors } from "../../store";
import { DrawerView } from "../../models/drawer-view";
import { ManageMode } from "../../models/manageMode";
import { ConfigurationViewMode } from "../../models/configurationViewMode";
import { ConfigurationUpdate } from "../../models/configurationUpdate";


@Component({
  selector: 'app-manage-configuration-container',
  templateUrl: './manage-configuration.container.html',
})
export class ManageConfigurationContainer implements OnInit {
  configuration$:Observable<Configuration | null> = of(null)
  users$:Observable<User[]> = of([])
  triggers$:Observable<Trigger[]> = of([])
  managedConfigurationId$: Observable<string> = of("")
  selectedTrigger$: Observable<Trigger | null> = of(null)
  selectedUser$: Observable<User | null> = of(null)
  drawerViewState$:Observable<DrawerView> = of("none");
  configurationManangeMode$: Observable<ManageMode> = of("create");
  configurationViewMode$: Observable<ConfigurationViewMode> = of("view");
  triggerManangeMode$: Observable<ManageMode> = of("create");
  userManangeMode$: Observable<ManageMode> = of("create");

  constructor(
    private store: Store<ConfigurationState>
  ){}

  ngOnInit(): void {
    this.configuration$ = this.store.select(ConfigurationSelectors.getEditedManagedConfiguration)
    this.triggers$ = this.store.select(ConfigurationSelectors.getManagedTriggers)
    this.users$ = this.store.select(ConfigurationSelectors.getManagedUsers)
    this.selectedUser$ = this.store.select(ConfigurationSelectors.getSelectedUser)
    this.selectedTrigger$ = this.store.select(ConfigurationSelectors.getSelectedTrigger)
    this.drawerViewState$ = this.store.select(ConfigurationSelectors.getDrawerViewState)
    this.managedConfigurationId$ = this.store.select(ConfigurationSelectors.getManagedConfigurationId)
    this.configurationManangeMode$ = this.store.select(ConfigurationSelectors.getConfigurationManageMode)
    this.configurationViewMode$ = this.store.select(ConfigurationSelectors.getConfigurationViewMode)
    this.triggerManangeMode$ = this.store.select(ConfigurationSelectors.getTriggerManageMode)
    this.userManangeMode$ = this.store.select(ConfigurationSelectors.getUserManageMode)
  }

  onConfigurationValueChange(updatedConfigData: ConfigurationUpdate){
    this.store.dispatch(ConfigurationActions.SelectedConfigurationValueChange({updatedConfigData}))
  }

  onDrawerViewChange(drawerToggle: { view: DrawerView, id?: string }) {
    this.store.dispatch(ConfigurationActions.DrawerViewChange({ drawerToggle }))
  }

  onToggleViewMode(mode: ConfigurationViewMode){
    this.store.dispatch(ConfigurationActions.ConfigurationViewModeChange({ mode }))
  }

  onSubmitConfiguration(){
    this.store.dispatch(ConfigurationActions.ManagedConfigurationUpdateSubmit())
  }

  onConfigurationDelete(configurationId: string){
    this.store.dispatch(ConfigurationActions.ConfigurationDelete({ configurationId }))
  }

  onTriggerCreate(trigger: Trigger){
    this.store.dispatch(ConfigurationActions.TriggerCreate({ trigger }))
  }

  onTriggerEdit(trigger: Trigger){
    this.store.dispatch(ConfigurationActions.TriggerEdit({ trigger }))
  }
  
  onTriggerDelete(triggerId:string) {
    this.store.dispatch(ConfigurationActions.TriggerDelete({ triggerId }))
  }
  
  onUserCreate(user: User){
    this.store.dispatch(ConfigurationActions.UserCreate({ user }))
  }

  onUserEdit(user: User){
    this.store.dispatch(ConfigurationActions.UserEdit({ user }))
  }

  onUserDelete(userId:string) {
    this.store.dispatch(ConfigurationActions.UserDelete({ userId }))
  }
}