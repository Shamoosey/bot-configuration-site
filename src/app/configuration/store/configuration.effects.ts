import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConfigurationService } from "../services";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap} from "rxjs";
import { Store, select } from "@ngrx/store";
import * as ConfigurationActions from "./configuration.actions"
import * as ConfigurationSelectors from "./configuration.selectors"
import { ConfigurationState } from "./configuration.reducer";
import * as fromRouter from '@ngrx/router-store';

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
    switchMap(() => {
      return this.configurationService$.getConfiguations()
        .pipe(
          map(configurations => ConfigurationActions.LoadConfigurationsSuccess({ configurations })),
          catchError(error => of(ConfigurationActions.LoadConfigurationsFail()))
      )
    })
  ));

  loadManagedConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadManagedConfiguration),
    mergeMap(({ configurationId }) => {
      if(configurationId !== null && configurationId !== undefined){
        return this.configurationService$.getConfiguation(configurationId)
          .pipe(
            map(config => ConfigurationActions.LoadManagedConfigurationSuccess({ configuration: config })),
            catchError(error => of(ConfigurationActions.LoadManagedConfigurationFail(error)))
        )
      } else {
        return of(ConfigurationActions.LoadManagedConfigurationFail({error: null}))
      }
    })
  ));

  routeNavigationSelectedId$ = createEffect(() => this.actions$.pipe(
    ofType(fromRouter.ROUTER_NAVIGATION),
    mergeMap(() => this.store.pipe(
      select(ConfigurationSelectors.selectQueryParam("configuration_id")))
    ),
    map((id: string) => ConfigurationActions.LoadManagedConfiguration({ configurationId: id })),
  ))
}