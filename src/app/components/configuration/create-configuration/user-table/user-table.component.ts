import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() users: User[];
  @Output() onUserEdit = new EventEmitter<User>();
  @Output() onUserDelete = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Configuration>();
  displayedColumns = [
    "icon",
    "isSecret",
    "userName",
    "discordUserId",
  ]

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onEditTrigger(User:User) {
    this.onUserEdit.emit(User)
  }

  onDeleteTrigger(userId: string){
    this.onUserDelete.emit(userId)
  }
}
