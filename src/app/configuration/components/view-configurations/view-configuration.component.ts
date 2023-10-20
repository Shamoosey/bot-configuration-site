import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Configuration } from '../../models/configuration';

@Component({
  selector: 'app-view-configuration',
  templateUrl: './view-configuration.component.html',
  styleUrls: ['./view-configuration.component.scss'],
})
export class ViewConfigurationComponent implements OnInit, OnChanges {
  @Input() configurations: Configuration[] = []
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Configuration>();
  displayedColumns = [
    "edit-icon",
    "serverName",
    "defaultChannel",
    "enableKickCache",
    "kickCacheUserMessage",
    "kickCacheServerMessage",
    "kickCacheHours",
    "kickCacheDays",
    "triggerCount",
    "userCount"
  ] 

  constructor(
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes["configurations"].currentValue){
      this.dataSource.data = changes["configurations"].currentValue;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnInit(): void {
  }

  onEditConfig(config: Configuration) {
    this.router.navigate(['configuration/manage-configuration'], {queryParams: {id: config.id}})
  }
}
