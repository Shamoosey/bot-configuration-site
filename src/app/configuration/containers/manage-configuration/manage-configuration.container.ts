import { Component, OnInit } from "@angular/core";
import { ConfigurationState } from "../../store/configuration.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Configuration } from "../../models";
import { ConfigurationActions, ConfigurationSelectors } from "../../store";


@Component({
  selector: 'app-manage-configuration-container',
  templateUrl: './manage-configuration.container.html',
})
export class ManageConfigurationContainer implements OnInit {
  configuration$:Observable<Configuration | null> = null

  constructor(
    private store: Store<ConfigurationState>
  ){
  }

  ngOnInit(): void {
    this.configuration$ = this.store.select(ConfigurationSelectors.getSelectedConfiguration)
  }
  
}