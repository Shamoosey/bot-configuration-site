import { Component, OnInit } from "@angular/core";
import { ConfigurationState } from "../../store/configuration.reducer";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Configuration, Trigger, User } from "../../models";
import { ConfigurationActions, ConfigurationSelectors } from "../../store";
import { DrawerView } from "../../models/drawer-view";


@Component({
  selector: 'app-manage-configuration-container',
  templateUrl: './manage-configuration.container.html',
})
export class ManageConfigurationContainer implements OnInit {
  configuration$:Observable<Configuration | null> = of(null)
  users$:Observable<User[]> = of([])
  triggers$:Observable<Trigger[]> = of([])
  drawerViewState$:Observable<DrawerView> = of("none");

  constructor(
    private store: Store<ConfigurationState>
  ){}

  ngOnInit(): void {
    this.configuration$ = this.store.select(ConfigurationSelectors.getManagedConfiguration)
    this.triggers$ = this.store.select(ConfigurationSelectors.getManagedTriggers)
    this.users$ = this.store.select(ConfigurationSelectors.getManagedUsers)
    this.drawerViewState$ = this.store.select(ConfigurationSelectors.getDrawerViewState)
  }

  onDrawerViewChange(drawerView: DrawerView) {
    this.store.dispatch(ConfigurationActions.DrawerViewChange({ drawerView }))
  }
}