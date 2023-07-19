import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CORE_COMPONENTS } from '.';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    ...CORE_COMPONENTS
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  exports: [
    ...CORE_COMPONENTS
  ]
})
export class CoreModule { }
