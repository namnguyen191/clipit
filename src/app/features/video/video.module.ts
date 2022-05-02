import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  declarations: [ManageComponent, UploadComponent],
  imports: [CommonModule, VideoRoutingModule]
})
export class VideoModule {}
