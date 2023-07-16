import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Trigger } from 'src/app/models/trigger';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.scss']
})
export class CreateConfigurationComponenet implements OnInit {
  @ViewChild("drawer") drawer: MatDrawer;
  @Output() closeButtonClicked = new EventEmitter<void>();

  triggers: Trigger[] = [];
  users: User[] = [];

  configForm: FormGroup;
  

  constructor(
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.configForm = this.fb.group({
      "serverId": new FormControl("", {}),
      "defaultChannel": new FormControl("", {}),
      "enableKickCache": new FormControl(false, {}),
      "kickCacheDays": new FormControl("", {}),
      "KickCacheHours": new FormControl("", {}),
      "KickCacheServerMessage": new FormControl("", {}),
      "KickCacheUserMessage": new FormControl("", {}),
    })
  }

  onSave(closeOnSuccess = false) {

    if(closeOnSuccess) {
      this.onClose();
    }
  }

  onDrawerOpen() {
    this.drawer.open();
  }

  onDrawerClose() {
    this.drawer.close();
  }

  onClose(userClicked = false) {
    this.closeButtonClicked.emit();
  }

  onCreateTrigger(){
    
  }

  onCreateUser(){

  }
  
  onTriggerEdit(trigger: Trigger){

  }

  onTriggerDelete(triggerId:string) {
    
  }

  onUserEdit(trigger: User){

  }

  onUserDelete(userId:string) {
    
  }

}
