import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ManageMode } from 'src/app/configuration/models/manageMode';
import { User } from 'bot-configuration-types';
import { UserService } from 'src/app/configuration/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnChanges {
  @Input() user: User | null;
  @Input() editMode: boolean;
  @Input() manageMode: ManageMode;

  @Output() onClose = new EventEmitter();
  @Output() onUserEdit = new EventEmitter<User>();
  @Output() onUserCreate = new EventEmitter<User>();

  userForm: FormGroup;


  constructor(
    private fb: FormBuilder,
  ) { 
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if("users" in changes){
      this.initializeForm();
    }
  }


  initializeForm() {
    this.userForm = this.fb.group({
      "username": new FormControl(this.user?.userName ?? "", [ Validators.required ]),
      "discordUserId": new FormControl(this.user?.discordUserId ?? "", [ Validators.required ]),
      "isSecret": new FormControl(this.user?.isSecret ?? false),
    })
  }

  onSubmit(){
    this.userForm.markAllAsTouched();
    if(this.userForm.status != "INVALID" && this.editMode) {
      let submittedUser: User = {
        id: this.user ? this.user.id : null,
        discordUserId: this.userForm.controls["discordUserId"].value,
        isSecret: this.userForm.controls["isSecret"].value,
        userName: this.userForm.controls["username"].value
      } 

      if(this.manageMode == "edit"){
        this.onUserEdit.emit(submittedUser)
      } else {
        this.onUserCreate.emit(submittedUser)
      }

      this.onClose.emit()
    }
  }

  resetForm(){
    this.user = null;
    this.userForm.reset();
  }

  onDrawerClose(){
    this.onClose.emit();
  }
}
