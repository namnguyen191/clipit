import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, last, map, Observable, Subject } from 'rxjs';
import { IAlert } from 'src/app/shared/alert/alert.component';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent {
  readonly CLIP_UPLOADING_MESSAGE = 'Please wait! Your clip is being uploaded';

  isDragOver: boolean = false;
  file: File | null = null;
  // alert
  alert$: Subject<IAlert> = new Subject<IAlert>();
  // form
  formEnabled: boolean = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup({
    title: this.title
  });
  processingRequest$: Subject<boolean> = new Subject<boolean>();
  uploadPercentage$: Observable<number> | null = null;

  constructor(private angularFireStorage: AngularFireStorage) {}

  onFileDrop(e: DragEvent): void {
    this.isDragOver = false;

    this.file = e.dataTransfer?.files[0] ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      console.log('Nam data is: ', this.file?.type);
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.formEnabled = true;
  }

  uploadFile(): void {
    if (!this.file) return;

    this.alert$.next({
      show: true,
      color: 'blue',
      msg: this.CLIP_UPLOADING_MESSAGE
    });
    this.processingRequest$.next(true);

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const uploadTask = this.angularFireStorage.upload(clipPath, this.file);

    this.uploadPercentage$ = uploadTask.percentageChanges().pipe(
      map((percent) => (percent ? percent / 100 : 0)),
      finalize(() => (this.uploadPercentage$ = null))
    );

    uploadTask
      .snapshotChanges()
      .pipe(last())
      .subscribe({
        next: (snapShot) => {
          this.alert$.next({
            color: 'green',
            msg: 'Success! Your clip is now ready to be shared with the world.',
            show: true
          });
        },
        error: (err) => {
          this.alert$.next({
            color: 'red',
            msg: 'Upload failed. Please try again later',
            show: true
          });
          console.log('Nam data is: ', err);
        }
      });
  }
}
