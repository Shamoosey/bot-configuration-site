import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConfigurationService } from "../services";
import { catchError, map, withLatestFrom, of, switchMap} from "rxjs";
import { Store } from "@ngrx/store";
import * as ConfigurationActions from "./configuration.actions"
import * as ConfigurationSelectors from "./configuration.selectors"
import { ConfigurationState } from "./configuration.reducer";

@Injectable()
export class ConfigurationEffects {
  constructor(
    private store: Store<ConfigurationState>,
    private actions$: Actions,
    private configurationService$: ConfigurationService
  ) {}

  loadConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadConfigurations),
    withLatestFrom(this.store.select(ConfigurationSelectors.getConfiguations)),
    switchMap(() => this.configurationService$.getConfiguations()
      .pipe(
        map(configurations => ConfigurationActions.LoadConfigurationsSuccess({ configurations })),
        catchError(error => of(ConfigurationActions.LoadConfigurationsFail()))
      ))
    )
  );
}