import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { IAlert } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent {
  private _clip: IClip | null = null;

  @Input()
  set clip(newClip: IClip | null) {
    console.log('Nam data is: setting new clip', newClip);
    this._clip = newClip;

    if (!this.clip) return;

    this.clipId.setValue(this.clip.docID);
    this.title.setValue(this.clip.title);
    this.alert$.next(null);
  }

  get clip() {
    return this._clip;
  }

  @Output() update: EventEmitter<Partial<IClip>> = new EventEmitter<
    Partial<IClip>
  >();

  alert$: Subject<IAlert | null> = new Subject<IAlert | null>();
  isProcessingRequest$: Subject<boolean> = new Subject<boolean>();

  // edit clip form
  clipId = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipId
  });

  constructor(private clipService: ClipService) {}

  async onEditFormSubmit(): Promise<void> {
    if (!this.clip) return;

    this.isProcessingRequest$.next(true);

    this.alert$.next({
      show: true,
      msg: "Please wait while we're updating your clip",
      color: 'blue'
    });

    try {
      await this.clipService.updateClip({
        docID: this.clipId.value,
        title: this.title.value
      });
    } catch (error: unknown) {
      this.isProcessingRequest$.next(false);
      this.alert$.next({
        show: true,
        color: 'red',
        msg: 'Something went wrong. Please try again later'
      });
      return;
    }

    this.clip.title = this.title.value;
    this.update.emit(this.clip);
    this.isProcessingRequest$.next(false);
    this.alert$.next({
      show: true,
      color: 'green',
      msg: 'Success! Your clip is now updated'
    });
  }
}
