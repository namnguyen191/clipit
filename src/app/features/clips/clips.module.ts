import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClipsRoutingModule } from './clips-routing.module';
import { ClipsComponent } from './clips.component';

@NgModule({
  declarations: [ClipsComponent],
  imports: [CommonModule, ClipsRoutingModule, SharedModule]
})
export class ClipsModule {}
