import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipService } from 'src/app/services/clip.service';
import { ClipsComponent } from './clips.component';

const routes: Routes = [
  {
    path: ':id',
    resolve: {
      clip: ClipService
    },
    component: ClipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClipsRoutingModule {}
