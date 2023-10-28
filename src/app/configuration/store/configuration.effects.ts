import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConfigurationService, TriggerService, UserService } from "../services";
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
    private configurationService: ConfigurationService,
    private triggerService: TriggerService,
    private userService: UserService
  ) {}

  loadConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadConfigurations),
    withLatestFrom(this.store.select(ConfigurationSelectors.getConfiguations)),
    switchMap(([{ useCache }, configurations]) => {
      if(configurations != null && useCache) {
        return of(ConfigurationActions.LoadConfigurationsSuccess({ configurations }))
      } else {
        return this.configurationService.getConfiguations()
          .pipe(
            map(configurations => ConfigurationActions.LoadConfigurationsSuccess({ configurations })),
            catchError(error => of(ConfigurationActions.LoadConfigurationsFail()))
        )
      }
    })
  ));

  loadManagedConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadManagedConfiguration),
    mergeMap(({ configurationId }) => {
      if(IsNotNullOrWhiteSpace(configurationId)){
        return this.configurationService.getConfiguation(configurationId)
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
  ));

  //Configuration Effects
  editConfiguration$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ConfigurationEdit),
    mergeMap(({ configuration }) => {
      let error = "Configuration is null|undefined";
      if(configuration !== null && configuration !== undefined){
        const configId = configuration.id;
        if(IsNotNullOrWhiteSpace(configId)){
          return this.configurationService.updateConfiguration(configId, configuration)
            .pipe(
              map(result => ConfigurationActions.ConfigurationUpdateSuccess({ updateType: "edit", result})),
              catchError(error => of(ConfigurationActions.ConfigurationUpdateFail({ updateType: "edit", result: false, error })))
          )
        } else {
          error = "ConfigurationId is null|undefined"
        }
      }
  
      return of(ConfigurationActions.ConfigurationUpdateFail({updateType: "edit", result: false, error }))
    })
  ));

  createConfiguration$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ConfigurationCreate),
    mergeMap(({ configuration }) => {
      if(configuration !== null && configuration !== undefined){
        return this.configurationService.createConfiguration(configuration)
          .pipe(
            map(result => ConfigurationActions.ConfigurationUpdateSuccess({ updateType: "create", result})),
            catchError(error => of(ConfigurationActions.ConfigurationUpdateFail({ updateType: "create", result: false, error})))
        )
      } else {
        return of(ConfigurationActions.ConfigurationUpdateFail({ updateType: "create", result: false, error: "Configuration is null|undefined"}))
      }
    })
  ));

  //Trigger Effects
  selectedTriggers$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerUpdateSuccess),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([update, configurationId]) => {
      if(IsNotNullOrWhiteSpace(configurationId)){
        return this.triggerService.getTriggers(configurationId)
          .pipe(
            map(result => ConfigurationActions.TriggerRefreshSuccess({triggers: result })),
            catchError(error => of(ConfigurationActions.TriggerRefreshFail({ error})))
        )
      }
      return of(ConfigurationActions.TriggerRefreshFail({ error: "ConfigurationId is null|undefined" }))
    })
  ));

  createTrigger$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerCreate),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([{ trigger}, configurationId]) => {
      console.log(configurationId)
      let error = "Trigger is null|undefined";
      if(trigger !== null && trigger !== undefined){
        if(IsNotNullOrWhiteSpace(configurationId)){
          return this.triggerService.createTrigger(trigger, configurationId)
            .pipe(
              map(result => ConfigurationActions.TriggerUpdateSuccess({ updateType: "create", result, })),
              catchError(error => of(ConfigurationActions.TriggerUpdateFail({ updateType: "create", result: false, error})))
          )
        } else {
          error = "ConfigurationId is null|undefined"
        }
      }

      return of(ConfigurationActions.TriggerUpdateFail({ updateType: "create", result: false, error }))
    })
  ));

  editTrigger$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerEdit),
    mergeMap(( { trigger } ) => {
      let error = "Trigger is null|undefined";
      if(trigger !== null && trigger !== undefined){
        if(IsNotNullOrWhiteSpace(trigger.id)){
          return this.triggerService.updateTrigger(trigger.id, trigger)
            .pipe(
              map(result => ConfigurationActions.TriggerUpdateSuccess({ updateType: "edit", result })),
              catchError(error => of(ConfigurationActions.TriggerUpdateFail({ updateType: "edit", result: false, error})))
          )
        } else {
          error = "ConfigurationId is null|undefined"
        }
      }

      return of(ConfigurationActions.TriggerUpdateFail({ updateType: "edit", result: false, error }))
    })
  ));

  deleteTrigger$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerDelete),
    mergeMap(( { triggerId } ) => {
      if(IsNotNullOrWhiteSpace(triggerId)){
        return this.triggerService.deleteTrigger(triggerId)
          .pipe(
            map(result => ConfigurationActions.TriggerUpdateSuccess({ updateType: "delete", result })),
            catchError(error => of(ConfigurationActions.TriggerUpdateFail({ updateType: "delete", result: false, error})))
        )
      }
      return of(ConfigurationActions.TriggerUpdateFail({ updateType: "delete", result: false, error:"TriggerId is null|undefined" }))
    })
  ));

  //User Effects
  selectedUsers$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserUpdateSuccess),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([update, configurationId]) => {
      if(IsNotNullOrWhiteSpace(configurationId)){
        return this.userService.getUsers(configurationId)
          .pipe(
            map(result => ConfigurationActions.UserRefreshSuccess({ users: result })),
            catchError(error => of(ConfigurationActions.UserRefreshFail({ error})))
        )
      }
      return of(ConfigurationActions.UserRefreshFail({ error: "ConfigurationId is null|undefined" }))
    })
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserCreate),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([{ user }, configurationId]) => {
      let error = "Trigger is null|undefined";
      if(user !== null && user !== undefined){
        if(IsNotNullOrWhiteSpace(configurationId)){
          return this.userService.createUser(user, configurationId)
            .pipe(
              map(result => ConfigurationActions.UserUpdateSuccess({ updateType: "create", result, })),
              catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "create", result: false, error})))
          )
        } else {
          error = "ConfigurationId is null|undefined"
        }
      }

      return of(ConfigurationActions.UserUpdateFail({ updateType: "create", result: false, error }))
    })
  ));

  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserEdit),
    mergeMap(( { user } ) => {
      let error = "User is null|undefined";
      if(user !== null && user !== undefined){
        if(IsNotNullOrWhiteSpace(user.id)){
          return this.userService.updateUser(user.id, user)
            .pipe(
              map(result => ConfigurationActions.UserUpdateSuccess({ updateType: "edit", result })),
              catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "edit", result: false, error})))
          )
        } else {
          error = "ConfigurationId is null|undefined"
        }
      }

      return of(ConfigurationActions.UserUpdateFail({ updateType: "edit", result: false, error }))
    })
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserDelete),
    mergeMap(( { userId } ) => {
      if(IsNotNullOrWhiteSpace(userId)){
        return this.userService.deleteUser(userId)
          .pipe(
            map(result => ConfigurationActions.UserUpdateSuccess({ updateType: "delete", result })),
            catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "delete", result: false, error})))
        )
      }
      return of(ConfigurationActions.UserUpdateFail({ updateType: "delete", result: false, error:"UserId is null|undefined" }))
    })
  ));
}

export function IsNotNullOrWhiteSpace(str: string){
  return (str !== null && str !== undefined && str.trim() != "")
}