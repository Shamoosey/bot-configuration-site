import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog-component/dialog.component';
import { DialogData } from '../../shared/models/dialog-data';
import { DialogResult } from '../../shared/models/dialog-result';
import { Trigger } from '../../shared/models/trigger';
import { User } from '../../shared/models/user';
import { Configuration } from 'src/app/shared/models/configuration';

@Component({
  selector: 'app-manage-configuration',
  templateUrl: './manage-configuration.component.html',
  styleUrls: ['./manage-configuration.component.scss']
})
export class ManageConfigurationComponent implements OnInit {
  @ViewChild("drawer") drawer: MatDrawer;
  @Output() closeButtonClicked = new EventEmitter<void>();
  
  configId: string | null;
  
  editedConfig: Configuration | null = null;
  editedTriggerId: string | null = null;
  editedUserId: string | null = null;

  triggers: Trigger[] = [];
  users: User[] = [];

  configForm: FormGroup;

  drawerView: "user" | "trigger" | null = null;

  get editMode() {
    return this.configId != null;
  }

  constructor(
    private fb: FormBuilder,
    private configurationService: ConfigurationService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.editedConfig = null;
    this.configId = this.route.snapshot.queryParamMap.get("id");
    this.configurationService.getConfiguation(this.configId).subscribe((config) => {
      this.editedConfig = config;
      this.triggers = config?.triggers
      this.users = config?.users
      this.initializeForm();
    });
    this.initializeForm();
  }


  initializeForm(){
    this.configForm = this.fb.group({
      "serverId": new FormControl(this.editedConfig?.serverId ?? "", [ Validators.required ]),
      "defaultChannel": new FormControl(this.editedConfig?.defaultChannel ??"", [ Validators.required ]),
      "enableKickCache": new FormControl(this.editedConfig?.enableKickCache, {}),
      "kickCacheDays": new FormControl(this.editedConfig?.kickCacheDays, {}),
      "kickCacheHours": new FormControl(this.editedConfig?.kickCacheHours, {}),
      "kickCacheServerMessage": new FormControl(this.editedConfig?.kickCacheServerMessage, {}),
      "kickCacheUserMessage": new FormControl(this.editedConfig?.kickCacheUserMessage, {}),
    })
    this.onKickCacheClick();
  }

  onSave(closeOnSuccess = false) {
    if(closeOnSuccess) {
      this.onClose();
    }
  }

  onDeleteConfig() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Delete Configuration?",
        text: "Are you sure you'd like to delete this configuration? \nThis operation is irreversible.",
        primaryButtonText: "Yes, delete",
        secondaryButtonText: "No, cancel"
      } as DialogData
    })

    dialogRef.afterClosed().subscribe((x:DialogResult)=> {
      if(x.primaryButtonClicked){
        this.configurationService.deleteConfiguration(this.configId).subscribe(x => {
          this.router.navigate(["./"])
        })
      }
    })
  }

  onKickCacheClick() {
    if(this.configForm.controls["enableKickCache"].value){
      this.configForm.controls["kickCacheDays"].enable();
      this.configForm.controls["kickCacheHours"].enable();
      this.configForm.controls["kickCacheServerMessage"].enable();
      this.configForm.controls["kickCacheUserMessage"].enable();
    } else {
      this.configForm.controls["kickCacheDays"].disable();
      this.configForm.controls["kickCacheHours"].disable();
      this.configForm.controls["kickCacheServerMessage"].disable();
      this.configForm.controls["kickCacheUserMessage"].disable();
    }
  }

  onClose(userClicked = false) {
    this.closeButtonClicked.emit();
  }

  onSubmit(){
    this.configForm.updateValueAndValidity();
    
    if(this.configForm.status != "INVALID") {
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
        triggers: this.triggers,
        users: this.users
      }

      if(this.editMode) {
        this.configurationService.updateConfiguration(this.configId, config).subscribe((x) => {
          console.log(x)
          // this.router.navigate(["./"])
        })
      } else {
        this.configurationService.createConfiguration(config).subscribe((x) => {
          console.log(x)
          // this.router.navigate(["./"])
        })
      }

    }
  }

  onCreateTrigger(){
    this.drawer.open();
    this.drawerView = "trigger"
  }

  onCreateUser(){
    this.drawer.open();
    this.drawerView = "user"
  }

  onDrawerClose() {
    this.drawer.close();
    this.drawerView = null;;
  }
  
  onTriggerEdit(trigger: Trigger){
    this.drawer.open();
    this.drawerView = "trigger"
    this.editedTriggerId = trigger.id;
  }

  onTriggerDelete(triggerId:string) {
    this.onDrawerClose();
    
  }

  onUserEdit(user: User){
    this.drawer.open();
    this.drawerView = "user"
    this.editedUserId = user.id;

  }

  onUserDelete(userId:string) {
    this.onDrawerClose();
    
  }

}
