import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent, AuthModalComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule]
})
export class UserModule {}
