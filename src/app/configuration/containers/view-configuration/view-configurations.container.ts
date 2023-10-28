import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ConfigurationState } from "../../store/configuration.reducer";
import { Store } from "@ngrx/store";

import { Configuration } from "../../models";
import { Observable, of } from "rxjs";
import { ConfigurationActions, ConfigurationSelectors } from "../../store";


@Component({
  selector: 'app-view-configurations-container',
  templateUrl: './view-configurations.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewConfigurationContainer implements OnInit {
  configurations$:Observable<Configuration[]> = of([]) 

  constructor(
    private store: Store<ConfigurationState>
  ) {
    
  }

  ngOnInit(): void {
    this.configurations$ = this.store.select(ConfigurationSelectors.getConfiguations)
    this.store.dispatch(ConfigurationActions.LoadConfigurations({useCache: true}))
  }
}