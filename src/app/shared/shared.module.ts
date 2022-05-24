import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';
import { ClipsListComponent } from './clips-list/clips-list.component';
import { EventBlockerDirective } from './directives/event-blocker.directive';
import { InputComponent } from './input/input.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalComponent } from './modal/modal.component';
import { FpTimeStampPipe } from './pipes/fp-time-stamp.pipe';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';

@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    EventBlockerDirective,
    FpTimeStampPipe,
    ClipsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    EventBlockerDirective,
    FpTimeStampPipe,
    ClipsListComponent
  ]
})
export class SharedModule {}
