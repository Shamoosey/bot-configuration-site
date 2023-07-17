import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Trigger } from '../../models/trigger';
import { TriggerService } from '../../services/trigger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trigger-table',
  templateUrl: './trigger-table.component.html',
  styleUrls: ['./trigger-table.component.scss']
})
export class TriggerTableComponent implements OnInit {
  @Input() configId: string;
  @Output() onTriggerEdit = new EventEmitter<Trigger>();
  @Output() onTriggerDelete = new EventEmitter<string>();

  triggers: Trigger[];

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

  triggerSubscription: Subscription;

  constructor(
    private triggerService: TriggerService
  ) { }

  ngOnInit(): void {
    this.refreshDatasource();
  }

  refreshDatasource(){
    this.triggerSubscription = this.triggerService.getTriggers(this.configId).subscribe(triggers => {
      this.triggers = triggers;
      this.dataSource.data = this.triggers;
      this.dataSource.sort = this.sort;
    })
  }

  onEditTrigger(trigger:Trigger) {
    this.onTriggerEdit.emit(trigger)
  }

  onDeleteTrigger(triggerId: string){
    this.onTriggerDelete.emit(triggerId)
  }
}