import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipsComponent } from './clips.component';

const routes: Routes = [
  {
    path: ':id',
    component: ClipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClipsRoutingModule {}
