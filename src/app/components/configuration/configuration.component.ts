import { Component, OnInit, ViewChild } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from './configuration-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  @ViewChild("drawer") drawer: MatDrawer;
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

  editedConfig: Configuration | null = null;

  get editMode() {
    return this.editedConfig != null;
  }
  

  constructor(
    private configurationService: ConfigurationService
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

  onCreateConfig(){
    this.editedConfig = null;
    this.drawer.open();
  }

  onEditConfig(config: Configuration) {
    this.editedConfig = config;
    this.drawer.open();
  }

  onDrawerClose(){
    this.drawer.close();
    this.editedConfig = null;
  }

}
