import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigurationService } from '../shared/services/configuration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Configuration } from '../shared/models/configuration';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
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
    private configurationService: ConfigurationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshConfigurations();
  }

  refreshConfigurations() {
    this.configurationService.getConfiguations().subscribe(configurations => {
      this.dataSource.data = configurations;
      this.dataSource.sort = this.sort;
    })
  }

  onEditConfig(config: Configuration) {
    this.router.navigate(['configuration/manage-configuration'], {queryParams: {id: config.id}})
  }
}
