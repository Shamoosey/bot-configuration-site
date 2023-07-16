import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Trigger } from 'src/app/models/trigger';

@Component({
  selector: 'app-trigger-table',
  templateUrl: './trigger-table.component.html',
  styleUrls: ['./trigger-table.component.scss']
})
export class TriggerTableComponent implements OnInit {
  @Input() triggers: Trigger[];
  @Output() onTriggerEdit = new EventEmitter<Trigger>();
  @Output() onTriggerDelete = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Configuration>();
  displayedColumns = [
    "icon",
    "name",
    "messageDelete",
    "sendRandomResponse",
    "ignoreCooldown",
    "triggerWords",
    "reactEmotes",
    "triggerResponses",
  ]

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onEditTrigger(trigger:Trigger) {
    this.onTriggerEdit.emit(trigger)
  }

  onDeleteTrigger(triggerId: string){
    this.onTriggerDelete.emit(triggerId)
  }
}
