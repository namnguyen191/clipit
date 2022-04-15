import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  readonly MODAL_ID: string = 'registrationModal';

  constructor(
    public modalService: ModalService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.modalService.registerModal(this.MODAL_ID);
    this.modalService.showModal(this.MODAL_ID);
  }

  onModalClose() {
    this.navigationService.back();
  }
}
