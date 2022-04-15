import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

const routes: Routes = [{ path: '', component: AuthModalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
