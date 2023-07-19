import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
import { Subject, Subscription, concat, takeUntil } from 'rxjs';
import { TriggerService } from 'src/app/shared/services/trigger.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-configuration',
  templateUrl: './manage-configuration.component.html',
  styleUrls: ['./manage-configuration.component.scss']
})
export class ManageConfigurationComponent implements OnInit, OnDestroy {
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

  kickCacheControls = [
    "kickCacheDays",
    "kickCacheHours",
    "kickCacheServerMessage",
    "kickCacheUserMessage",
  ]

  private ngUnsubscribe = new Subject<void>();
  
  editMode = false;

  get manageMode() {
    return this.configId != null;
  }

  constructor(
    private fb: FormBuilder,
    private configurationService: ConfigurationService,
    private triggerService: TriggerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.editedConfig = null;
    this.route.queryParamMap.subscribe(data => {
      this.configId = data.get("id")
      if(this.configId){
        this.updateData();
      }
    })
    this.initializeForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateData() {
    this.configurationService.getConfiguation(this.configId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((config) => {
        this.editedConfig = config;
        this.triggers = config?.triggers ?? []
        this.users = config?.users ?? []
        this.initializeForm();
    });
  }


  initializeForm(){
    this.configForm = this.fb.group({
      "serverId": new FormControl(this.editedConfig?.serverId ?? "", [ Validators.required ]),
      "defaultChannel": new FormControl(this.editedConfig?.defaultChannel ??"", [ Validators.required ]),
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

  onDeleteConfig() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "Delete Configuration?",
        text: "Are you sure you'd like to delete this configuration? \nThis operation is irreversible.",
        primaryButtonText: "Yes, delete",
        secondaryButtonText: "No, cancel"
      } as DialogData
    })

    dialogRef.afterClosed().subscribe((x?:DialogResult)=> {
      if(x?.primaryButtonClicked){
        this.configurationService.deleteConfiguration(this.configId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            this.router.navigate(["./"])
        })
      }
    })
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
        triggers: this.triggers,
        users: this.users
      }

      if(this.manageMode) {
        this.configurationService.updateConfiguration(this.configId, config)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((x) => {
            console.log(x)
        })
      } else {
        this.configurationService.createConfiguration(config)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((x) => {
            console.log(x)
            this.router.navigate(["./"])
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

  onUserUpdate() {
    this.updateData();
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
    if(this.editMode){
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "Delete Trigger?",
          text: "Are you sure you'd like to delete this Trigger? \nThis operation is irreversible.",
          primaryButtonText: "Yes, delete",
          secondaryButtonText: "No, cancel"
        } as DialogData
      })
  
      dialogRef.afterClosed().subscribe((x?:DialogResult)=> {
        if(x?.primaryButtonClicked){
          this.triggerService.deleteTrigger(triggerId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((x) => {
              this.updateData();
          })
        }
      })
    }
  }

  onTriggerUpdate(){
    this.updateData();
  }

  onUserEdit(user: User){
    this.drawer.open();
    this.drawerView = "user"
    this.editedUserId = user.id;
  }

  onUserDelete(userId:string) {
    if(this.editMode){
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "Delete User?",
          text: "Are you sure you'd like to delete this user? \nThis operation is irreversible.",
          primaryButtonText: "Yes, delete",
          secondaryButtonText: "No, cancel"
        } as DialogData
      })
  
      dialogRef.afterClosed().subscribe((x?:DialogResult)=> {
        if(x?.primaryButtonClicked){
          this.userService.deleteUser(userId)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((x) => {
              this.updateData();
          })
        }
      })
    }
  }

}
