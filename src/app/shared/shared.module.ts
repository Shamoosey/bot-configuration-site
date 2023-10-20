import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SHARED_COMPONENTS } from './components';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
