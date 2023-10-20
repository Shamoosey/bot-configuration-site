import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CORE_COMPONENTS } from './components';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ...CORE_COMPONENTS
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    RouterModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
  exports: [
    ...CORE_COMPONENTS
  ]
})
export class CoreModule { }
