import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { IModal, ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() modalClose: EventEmitter<void> = new EventEmitter();
  @Input() id!: string;

  modal$!: Observable<IModal>;

  constructor(public modalService: ModalService, public el: ElementRef) {}

  ngOnDestroy(): void {
    this.modalService.unregisteredModal(this.id);
    document.body.removeChild(this.el.nativeElement);
  }

  ngOnInit(): void {
    if (!this.id) {
      throw Error('Please provide this modal with an id');
    }

    this.modal$ = this.modalService.getModalSubscription(this.id);

    document.body.appendChild(this.el.nativeElement);
  }

  onCloseModal() {
    this.modalService.hideModal(this.id);
    this.modalClose.emit();
  }
}
