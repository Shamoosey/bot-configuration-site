import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfigurationService } from '../../services/configuration.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog-component/dialog.component';
import { DialogData } from '../../../shared/models/dialog-data';
import { DialogResult } from '../../../shared/models/dialog-result';
import { Trigger } from '../../models/trigger';
import { User } from '../../models/user';
import { Configuration } from 'src/app/configuration/models/configuration';
import { DrawerView } from '../../models/drawer-view';
import { firstValueFrom } from 'rxjs';
import { ManageMode } from '../../models/manageMode';
import { ConfigurationViewMode } from '../../models/configurationViewMode';
import { ConfigurationUpdate } from '../../models/configurationUpdate';

@Component({
  selector: 'app-manage-configuration',
  templateUrl: './manage-configuration.component.html',
  styleUrls: ['./manage-configuration.component.scss']
})
export class ManageConfigurationComponent implements OnInit, OnChanges {
  @Input() configuration: Configuration | null = null;
  @Input() managedConfigurationId: string = null;
  @Input() users: User[] = [];
  @Input() triggers: Trigger[] = [];
  @Input() drawerViewState: DrawerView;
  @Input() selectedTrigger: Trigger | null;
  @Input() selectedUser: User | null;
  @Input() manageMode: ManageMode;
  @Input() triggerManageMode: ManageMode;
  @Input() userManageMode: ManageMode;
  @Input() viewMode: ConfigurationViewMode;
  
  @Output() closeButtonClicked = new EventEmitter<void>();
  @Output() onChangeManageMode = new EventEmitter<ManageMode>();
  @Output() toggleViewMode = new EventEmitter<ConfigurationViewMode>();
  @Output() submitClicked = new EventEmitter<void>();
  @Output() deleteConfiguration = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<User>();
  @Output() createUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() editTrigger = new EventEmitter<Trigger>();
  @Output() createTrigger = new EventEmitter<Trigger>();
  @Output() deleteTrigger = new EventEmitter<string>();
  @Output() drawerViewChange = new EventEmitter<{ view: DrawerView, id?: string }>();
  @Output() configurationValueChange = new EventEmitter<ConfigurationUpdate>();
  
  @ViewChild("drawer") drawer: MatDrawer;

  editedConfig: Configuration | null = null;

  configForm: FormGroup;

  kickCacheControls = [
    "kickCacheDays",
    "kickCacheHours",
    "kickCacheServerMessage",
    "kickCacheUserMessage",
  ]

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.manageMode == "edit"){
      this.editedConfig = { ...this.configuration };
      
    } else{
      this.editedConfig = null;
    }
    this.initializeForm();
    this.handleDrawerStateChange();
  }

  ngOnInit(): void {
    this.editedConfig = null;
    this.initializeForm();
  }

  handleDrawerStateChange(){
    if(this.drawer){
      switch(this.drawerViewState){
        case "user":
        case "trigger":
          this.drawer.open();
          break;
        case "none":
          this.drawer.close();
          break;
      }
    }
  }

  initializeForm(){
    const editedConfig = {...this.configuration}
    const kickCacheEnabled = editedConfig?.enableKickCache ?? false
    this.configForm = this.fb.group({
      "serverName": new FormControl({value: editedConfig?.name, disabled: this.viewMode == "view"}, [ Validators.required ]),
      "serverId": new FormControl({value: editedConfig?.serverId, disabled: this.viewMode == "view"}, [ Validators.required ]),
      "defaultChannel": new FormControl({value: editedConfig?.defaultChannel, disabled: this.viewMode == "view"}, [ Validators.required ]),
      "enableKickCache": new FormControl({value: kickCacheEnabled, disabled: this.viewMode == "view"}),
      "kickCacheDays": new FormControl({value: editedConfig?.kickCacheDays, disabled: this.viewMode == "view"}),
      "kickCacheHours": new FormControl({value: editedConfig?.kickCacheHours, disabled: this.viewMode == "view"}),
      "kickCacheServerMessage": new FormControl({value: editedConfig?.kickCacheServerMessage, disabled: this.viewMode == "view"}),
      "kickCacheUserMessage": new FormControl({value: editedConfig?.kickCacheUserMessage, disabled: this.viewMode == "view"}),
    })
    this.onKickCacheClick(kickCacheEnabled, true);
  }

  onSave(closeOnSuccess = false) {
    if(closeOnSuccess) {
      this.onClose();
    }
  }

  async onDeleteConfigClick() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Delete Configuration?",
        text: "Are you sure you'd like to delete this configuration? \nThis operation is irreversible.",
        primaryButtonText: "Yes, delete",
        secondaryButtonText: "No, cancel"
      } as DialogData
    })

    const result = await firstValueFrom(dialogRef.afterClosed()) as DialogResult
    if(result?.primaryButtonClicked){
      this.deleteConfiguration.emit(this.configuration.id)
    }
  }

  onConfigurationValueChange(){
    const configData: Configuration = {
      id: this.configuration?.id,
      name: this.configForm.controls["serverName"].value,
      serverId: this.configForm.controls["serverId"].value,
      defaultChannel: this.configForm.controls["defaultChannel"].value,
      enableKickCache: this.configForm.controls["enableKickCache"].value,
      kickCacheDays: this.configForm.controls["kickCacheDays"].value,
      kickCacheHours: this.configForm.controls["kickCacheHours"].value,
      kickCacheServerMessage: this.configForm.controls["kickCacheServerMessage"].value,
      kickCacheUserMessage: this.configForm.controls["kickCacheUserMessage"].value,
      triggers: undefined,
      users: undefined
    }

    this.configurationValueChange.emit(configData)
    
  }

  onKickCacheClick(mode: boolean, isInit) {
    if(this.viewMode == 'edit'){
      for(var cntrlName of this.kickCacheControls){
        if(mode){
          this.configForm.controls[cntrlName].enable();
          this.configForm.controls[cntrlName].addValidators([Validators.required]);
        } else {
          this.configForm.controls[cntrlName].disable();
          this.configForm.controls[cntrlName].removeValidators([Validators.required]);
          this.configForm.controls[cntrlName].markAsUntouched();
        }
        this.configForm.controls[cntrlName].updateValueAndValidity()
      }
      if(!isInit){
        this.onConfigurationValueChange();
      }
    }
  }

  onClose() {
    this.closeButtonClicked.emit();
  }

  onSubmit(){
    this.submitClicked.emit()
  }

  onToggleViewModeClick(mode: boolean){
    const manageMode = !mode ? "view" : "edit" 
    this.toggleViewMode.emit(manageMode)
  }

  onCreateTriggerClick(){
    this.drawerViewChange.emit({ view: "trigger", id: null })
  }

  onCreateUserClick(){
    this.drawerViewChange.emit({ view: "user", id: null})
  }

  onDrawerClose() {
    this.drawerViewChange.emit({ view: "none" });
  }

  onTriggerCreate(trigger: Trigger){
    this.createTrigger.emit(trigger)
  }

  onTriggerEdit(trigger: Trigger){
    this.editTrigger.emit(trigger)
  }
  
  onTriggerEditClick(trigger: Trigger){
    this.drawerViewChange.emit({ view: "trigger", id: trigger.id });
  }

  onTriggerDeleteClick(triggerId:string) {
    this.deleteTrigger.emit(triggerId)
  }

  onUserEditClick(user: User){
    this.drawerViewChange.emit({ view: "user", id: user.id });
  }

  onUserCreate(user: User){
    this.createUser.emit(user)
  }

  onUserEdit(user: User) {
    this.editUser.emit(user)
  }

  onUserDeleteClick(userId:string) {
    this.deleteUser.emit(userId)
  }
}
