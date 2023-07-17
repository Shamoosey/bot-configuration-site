import { Component, OnInit, ViewChild } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from './configuration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

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
