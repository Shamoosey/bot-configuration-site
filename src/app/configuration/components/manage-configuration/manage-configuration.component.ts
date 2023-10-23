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
  
  @Output() closeButtonClicked = new EventEmitter<void>();
  @Output() editConfiguration = new EventEmitter<Configuration>();
  @Output() editTrigger = new EventEmitter<Trigger>();
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteTrigger = new EventEmitter<string>();
  @Output() deleteUser = new EventEmitter<string>();
  @Output() deleteConfigurationClicked = new EventEmitter<void>();
  @Output() submitButtonClicked = new EventEmitter<void>();
  @Output() drawerViewChange = new EventEmitter<DrawerView>();
  @Output() configurationPropertyChange = new EventEmitter<Configuration>();
  
  @ViewChild("drawer") drawer: MatDrawer;

  editedConfig: Configuration | null = null;
  editedTriggerId: string | null = null;
  editedUserId: string | null = null;

  configForm: FormGroup;

  kickCacheControls = [
    "kickCacheDays",
    "kickCacheHours",
    "kickCacheServerMessage",
    "kickCacheUserMessage",
  ]
  
  editMode = false;

  get manageMode() {
    return this.configuration != null;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.configuration){
      this.editedConfig = { ...this.configuration }
      this.editMode = true;
    } else if (this.configuration == null){
      this.editMode = false;
      this.editedConfig = null;
      this.editedTriggerId = null;
      this.editedUserId = null;
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
    this.configForm = this.fb.group({
      "serverId": new FormControl(this.editedConfig?.serverId, [ Validators.required ]),
      "defaultChannel": new FormControl(this.editedConfig?.defaultChannel, [ Validators.required ]),
      "enableKickCache": new FormControl(this.editedConfig?.enableKickCache),
      "kickCacheDays": new FormControl(this.editedConfig?.kickCacheDays),
      "kickCacheHours": new FormControl(this.editedConfig?.kickCacheHours),
      "kickCacheServerMessage": new FormControl(this.editedConfig?.kickCacheServerMessage),
      "kickCacheUserMessage": new FormControl(this.editedConfig?.kickCacheUserMessage),
    })
    this.onKickCacheClick();
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
      this.deleteConfigurationClicked.emit()
    }
  }

  onKickCacheClick() {
    for(var cntrlName of this.kickCacheControls){
      if(this.configForm.controls["enableKickCache"].value){
        this.configForm.controls[cntrlName].enable();
        this.configForm.controls[cntrlName].addValidators([Validators.required]);
      } else {
        this.configForm.controls[cntrlName].disable();
        this.configForm.controls[cntrlName].removeValidators([Validators.required]);
        this.configForm.controls[cntrlName].markAsUntouched();
      }
      this.configForm.controls[cntrlName].updateValueAndValidity()
    }
  }

  onClose(userClicked = false) {
    this.closeButtonClicked.emit();
  }

  onSubmit(){
    this.submitButtonClicked.emit()
  }

  onConfigPropertyChange(){
    if(this.configForm.status != "INVALID" && this.editMode) {
      const kickCacheEnabled = this.configForm.controls["enableKickCache"].value;
      let config: Configuration = {
        serverId: this.configForm.controls["serverId"].value,
        defaultChannel: this.configForm.controls["defaultChannel"].value,
        enableKickCache: kickCacheEnabled,
        kickCacheDays: kickCacheEnabled ? this.configForm.controls["kickCacheDays"].value : 0,
        kickCacheHours: kickCacheEnabled ? this.configForm.controls["kickCacheHours"].value : 0,
        kickCacheServerMessage: kickCacheEnabled ? this.configForm.controls["kickCacheServerMessage"].value : "",
        kickCacheUserMessage: kickCacheEnabled ? this.configForm.controls["kickCacheUserMessage"].value : "",
        name: "server name", // this value will be pulled from serverId when using discord auth,
        triggers: [],
        users: [] // add back t he data later
      }

      this.configurationPropertyChange.emit(config)
    }
  }

  onCreateTriggerClick(){
    this.editedTriggerId = null;
    this.drawerViewChange.emit("trigger")
  }

  onCreateUserClick(){
    this.editedUserId = null;
    this.drawerViewChange.emit("user")
  }

  onDrawerClose() {
    this.drawerViewChange.emit("none");
  }
  
  onTriggerEditClick(trigger: Trigger){
    this.editedTriggerId = trigger.id;
    this.drawerViewChange.emit("trigger");
  }

  onTriggerDeleteClick(triggerId:string) {
    this.deleteTrigger.emit(triggerId)
  }

  onUserEditClick(user: User){
    this.editedUserId = user.id;
    this.drawerViewChange.emit("user")
  }

  onUserDeleteClick(userId:string) {
    this.deleteUser.emit(userId)
  }
}
