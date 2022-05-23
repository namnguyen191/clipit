import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClipsRoutingModule } from './clips-routing.module';
import { ClipsComponent } from './clips.component';

@NgModule({
  declarations: [ClipsComponent],
  imports: [CommonModule, ClipsRoutingModule]
})
export class ClipsModule {}
