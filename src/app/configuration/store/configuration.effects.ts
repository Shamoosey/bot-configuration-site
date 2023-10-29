import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConfigurationService, TriggerService, UserService } from "../services";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap} from "rxjs";
import { Store, select } from "@ngrx/store";
import * as ConfigurationActions from "./configuration.actions"
import * as ConfigurationSelectors from "./configuration.selectors"
import { ConfigurationState } from "./configuration.reducer";
import * as fromRouter from '@ngrx/router-store';
import { MatSnackBar } from "@angular/material/snack-bar";
import { IsNotNullOrWhiteSpace } from "src/app/shared/helpers/utils";

@Injectable()
export class ConfigurationEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ConfigurationState>,
    private actions$: Actions,
    private configurationService: ConfigurationService,
    private triggerService: TriggerService,
    private userService: UserService,
    private snackBar: MatSnackBar

  ) {}
  
  //#region Configuration Effects
  routeNavigationSelectedId$ = createEffect(() => this.actions$.pipe(
    ofType(fromRouter.ROUTER_NAVIGATION),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigRouteData)),
    switchMap(([{ action }, {routeConfigId, currentConfigId }]) => {
      if(currentConfigId != routeConfigId){
        return of(ConfigurationActions.LoadManagedConfiguration({ configurationId: routeConfigId }))
      } else {
        return of(ConfigurationActions.NoOperation())
      }
    })
  ));

  loadConfigurations$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadConfigurations),
    mergeMap(() => {
      return this.configurationService.getConfiguations()
        .pipe(
          map(configurations => ConfigurationActions.LoadConfigurationsSuccess({ configurations })),
          catchError(error => of(ConfigurationActions.LoadConfigurationsFail()))
      )
      
    })
  ));

  managedConfigurationIdChange$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ManagedConfigurationIdChange),
    mergeMap(({ configurationId }) => {
      return of(ConfigurationActions.LoadManagedConfiguration({ configurationId }))
    })
  ));

  loadManagedConfiguration$ = createEffect(() => this.actions$.pipe(
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

  loadManagedConfigurationFail$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.LoadManagedConfigurationFail),
    mergeMap(({ error }) => {
      this.snackBar.open("Unable to load managed configuration", null, {duration: this.SNACK_BAR_DURATION})
      return of(ConfigurationActions.NoOperation())
    })
  ));

  configurationUpdateResult$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ConfigurationUpdateSuccess, ConfigurationActions.ConfigurationUpdateFail),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([{ updateType, result, error }, configId]) => {
        if(result){
          this.snackBar.open("Configuration Successfully Updated", null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.LoadManagedConfiguration({configurationId: configId}))
        } else {
          let message = "Unable to update configuration";
          if((typeof error === "string" || (error as any) instanceof String) && IsNotNullOrWhiteSpace(error)){
            message = error
          }
          this.snackBar.open(message, null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.NoOperation())
        }
    })
  ));

  updateCreateConfiguration$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ManagedConfigurationUpdateSubmit),
    withLatestFrom(this.store.select(ConfigurationSelectors.getDataForManagedConfigurationSubmit)),
    switchMap(([action, {configuration, manageMode}]) => {
      let observable = of(false)
      let error = "Configuration is null|undefined";
      if(configuration !== null && configuration !== undefined){

        const config = {...configuration}
        const invalidConfig = (
          !IsNotNullOrWhiteSpace(config.name) || 
          !IsNotNullOrWhiteSpace(config.serverId) ||  
          !IsNotNullOrWhiteSpace(config.defaultChannel)
        )

        const invalidKickCache = (
            config.enableKickCache && (
            config.kickCacheDays === null || config.kickCacheDays === undefined ||
            config.kickCacheHours === null || config.kickCacheHours === undefined ||
            !IsNotNullOrWhiteSpace(config.kickCacheServerMessage) ||
            !IsNotNullOrWhiteSpace(config.kickCacheUserMessage)
          )
        )

        if(invalidConfig || invalidKickCache){
          return of(ConfigurationActions.ConfigurationUpdateFail({result: false, error: "Missing required parameters", updateType: manageMode}))
        }
        
        if(config.kickCacheDays == 0){
          config.kickCacheDays = 2
        }

        if(config.kickCacheHours == 0){
          config.kickCacheHours = 2
        }

        if(manageMode == "create"){

          observable = this.configurationService.createConfiguration(config);
        } else {
          const configId = configuration.id;
          if(IsNotNullOrWhiteSpace(configId)){
            observable = this.configurationService.updateConfiguration(configId, configuration)
          } else {
            error = "ConfigurationId is null|undefined"
          }
        }
      }
      return observable.pipe(
        map(result => {
          if (result) {
            return ConfigurationActions.ConfigurationUpdateSuccess({ updateType: manageMode, result});
          } else {
            return ConfigurationActions.ConfigurationUpdateFail({ updateType: manageMode, result, error});
          }
        }),
        catchError(error => of(ConfigurationActions.ConfigurationUpdateFail({ updateType: manageMode, result: false, error }))))
    })
  ))

  deleteConfiguration$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.ConfigurationDelete),
    mergeMap(( { configurationId } ) => {
      if(IsNotNullOrWhiteSpace(configurationId )){
        return this.configurationService.deleteConfiguration(configurationId)
          .pipe(
            map(result => ConfigurationActions.ConfigurationUpdateSuccess({ updateType: "delete", result })),
            catchError(error => of(ConfigurationActions.ConfigurationUpdateFail({ updateType: "delete", result: false, error})))
        )
      }
      return of(ConfigurationActions.ConfigurationUpdateFail({ updateType: "delete", result: false, error:"ConfigurationId is null|undefined" }))
    })
  ));
  //#endregion

  //#region Trigger Effects

  triggerUpdateResult$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerUpdateFail, ConfigurationActions.TriggerUpdateSuccess),
    mergeMap(({ updateType, result, error }) => {
        if(result){
          this.snackBar.open("Trigger Successfully Updated", null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.TriggerRefresh())
        } else {
          let message = `Unable to ${updateType} trigger`;
          if((typeof error === "string" || (error as any) instanceof String) && IsNotNullOrWhiteSpace(error)){
            message = error
          }
          this.snackBar.open(message, null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.NoOperation())
        }
    })
  ));

  refreshTriggers$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerRefresh),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([update, configurationId]) => {
      if(IsNotNullOrWhiteSpace(configurationId)){
        return this.triggerService.getTriggers(configurationId)
          .pipe(
            map(result => ConfigurationActions.TriggerRefreshSuccess({triggers: result })),
            catchError(error => of(ConfigurationActions.TriggerRefreshFail({ error })))
        )
      }
      return of(ConfigurationActions.TriggerRefreshFail({ error: "ConfigurationId is null|undefined" }))
    })
  ));

  createTrigger$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.TriggerCreate),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([{ trigger}, configurationId]) => {
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
  //#endregion

  //#region User Effects

  userUpdateResult$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserUpdateSuccess, ConfigurationActions.UserUpdateFail),
    mergeMap(({ updateType, result, error }) => {
        if(result){
          this.snackBar.open("User Successfully Updated", null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.UserRefresh())
        } else {
          let message = `Unable to ${updateType} user`;
          if((typeof error === "string" || (error as any) instanceof String) && IsNotNullOrWhiteSpace(error)){
            message = error
          }
          this.snackBar.open(message, null, {duration: this.SNACK_BAR_DURATION})
          return of(ConfigurationActions.NoOperation())
        }
    })
  ));

  refreshUsers$ = createEffect(() => this.actions$.pipe(
    ofType(ConfigurationActions.UserRefresh),
    withLatestFrom(this.store.select(ConfigurationSelectors.getManagedConfigurationId)),
    switchMap(([result, configurationId]) => {
      if(IsNotNullOrWhiteSpace(configurationId)){
        return this.userService.getUsers(configurationId)
          .pipe(
            map(result => ConfigurationActions.UserRefreshSuccess({ users: result })),
            catchError(error => of(ConfigurationActions.UserRefreshFail({ error })))
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
              catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "create", result: false, error })))
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
              catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "edit", result: false, error })))
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
            catchError(error => of(ConfigurationActions.UserUpdateFail({ updateType: "delete", result: false, error })))
        )
      }
      return of(ConfigurationActions.UserUpdateFail({ updateType: "delete", result: false, error:"UserId is null|undefined" }))
    })
  ));
  //#endregion
}