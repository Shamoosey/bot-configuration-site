import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/assets/material.module';
import { SHARED_COMPONENTS } from '../shared';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    NgSelectModule,
    RouterModule,
  ],
  providers: [
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
