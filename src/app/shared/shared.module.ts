import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';

@NgModule({
  declarations: [ModalComponent, TabsContainerComponent, TabComponent],
  imports: [CommonModule],
  exports: [ModalComponent, TabsContainerComponent, TabComponent]
})
export class SharedModule {}
