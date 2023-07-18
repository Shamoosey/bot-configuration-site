import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, OnChanges, OnDestroy {
  @Input() configId: string;
  @Input() userId: string | null;
  @Input() editMode: boolean;
  @Output() onClose = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  userForm: FormGroup;

  user: User | null = null;

  private ngUnsubscribe = new Subject<void>();


  get manageMode() {
    return this.userId != null;
  }

  constructor(
    private fb: FormBuilder,
    private userSerivce: UserService
  ) { 
    
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if("userId" in changes && this.userId != null){
      this.userSerivce.getUser(this.userId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((user) => {
          this.user = user;
          this.initializeForm();
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
        discordUserId: this.userForm.controls["discordUserId"].value,
        isSecret: this.userForm.controls["isSecret"].value,
        userName: this.userForm.controls["username"].value
      } 

      let userResponseSub: Observable<any>;
      if(this.manageMode){
        userResponseSub = this.userSerivce.updateUser(this.userId, submittedUser)
      } else {
        userResponseSub = this.userSerivce.createUser(submittedUser, this.configId)
      }

      userResponseSub
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(x => {
          this.resetForm();
          this.onUpdate.emit();
          this.onClose.emit();
      })
    }
  }

  resetForm(){
    this.userId = null;
    this.userForm.reset();
  }

  onDrawerClose(){
    this.onClose.emit();
  }
}
