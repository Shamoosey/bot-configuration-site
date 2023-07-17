import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() configId: string;
  @Output() onUserEdit = new EventEmitter<User>();
  @Output() onUserDelete = new EventEmitter<string>();

  users: User[];

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<User>();
  displayedColumns = [
    "icon",
    "isSecret",
    "userName",
    "discordUserId",
  ]

  userSubscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.refreshDatasource();
  }

  refreshDatasource(){
    this.userSubscription = this.userService.getUsers(this.configId).subscribe(users => {
      this.users = users;
      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
    })
  }

  onEditUser(User:User) {
    this.onUserEdit.emit(User)
  }

  onDeleteUser(userId: string){
    this.onUserDelete.emit(userId)
  }
}
