import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipsRoutingModule } from './clips-routing.module';
import { ClipsComponent } from './clips.component';


@NgModule({
  declarations: [
    ClipsComponent
  ],
  imports: [
    CommonModule,
    ClipsRoutingModule
  ]
})
export class ClipsModule { }
