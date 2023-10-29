import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Trigger } from 'bot-configuration-types';

@Component({
  selector: 'app-trigger-table',
  templateUrl: './trigger-table.component.html',
  styleUrls: ['./trigger-table.component.scss']
})
export class TriggerTableComponent implements OnInit, OnChanges {
  @Input() triggers: Trigger[];
  @Input() editMode: boolean = true;
  @Output() onTriggerEdit = new EventEmitter<Trigger>();
  @Output() onTriggerDelete = new EventEmitter<string>();

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Trigger>();
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

  ngOnInit() {
    this.refreshDatasource();
  }

  ngOnChanges(changes){
    if("triggers" in changes) {
      this.refreshDatasource();
    }
  }

  refreshDatasource(){
    this.dataSource.data = this.triggers;
    this.dataSource.sort = this.sort;
  }

  onEditTrigger(trigger:Trigger) {
    this.onTriggerEdit.emit(trigger)
  }

  onDeleteTrigger(triggerId: string){
    this.onTriggerDelete.emit(triggerId)
  }
}
