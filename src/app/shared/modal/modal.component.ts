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
import { Required } from '../decorators/required.decorator';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() modalClose: EventEmitter<void> = new EventEmitter();
  @Input() @Required id!: string;

  modal$!: Observable<IModal>;

  constructor(public modalService: ModalService, public el: ElementRef) {}

  ngOnDestroy(): void {
    console.log('Nam data is: modal destroyed');
    this.modalService.unregisteredModal(this.id);
    document.body.removeChild(this.el.nativeElement);
  }

  ngOnInit(): void {
    this.modal$ = this.modalService.getModalSubscription(this.id);

    document.body.appendChild(this.el.nativeElement);
  }

  onCloseModal() {
    this.modalService.hideModal(this.id);
    this.modalClose.emit();
  }
}
