import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
  combineLatest,
  finalize,
  last,
  map,
  Observable,
  Subject,
  switchMap
} from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { IUserData } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClipService } from 'src/app/services/clip.service';
import { IAlert } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent implements OnDestroy {
  readonly CLIP_UPLOADING_MESSAGE = 'Please wait! Your clip is being uploaded';

  isDragOver: boolean = false;
  file: File | null = null;
  user: IUserData | null = null;
  // alert
  alert$: Subject<IAlert> = new Subject<IAlert>();
  // form
  formEnabled: boolean = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup({
    title: this.title
  });
  isProcessingRequest$: Subject<boolean> = new Subject<boolean>();
  uploadPercentage$: Observable<number> | null = null;
  // TODO: implement canDeactivate guard when the upload task is in progress
  uploadTask: AngularFireUploadTask | null = null;

  constructor(
    private authService: AuthService,
    private clipService: ClipService,
    private router: Router
  ) {
    this.authService.user$.subscribe((usr) => (this.user = usr));
  }

  ngOnDestroy(): void {
    if (this.uploadTask) {
      this.uploadTask.cancel();
    }
  }

  onFileDrop(e: DragEvent): void {
    this.isDragOver = false;

    const file = e.dataTransfer?.files[0] ?? null;

    this.setFile(file);
  }

  onFileSelect(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0] ?? null;

    this.setFile(file);
  }

  setFile(file: File | null): void {
    if (!file) return;

    this.file = file;
    if (this.file.type !== 'video/mp4') {
      console.log('Nam data is: ', this.file?.type);
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.formEnabled = true;
  }

  uploadFile(): void {
    if (!this.file) return;

    this.uploadForm.disable();

    this.alert$.next({
      show: true,
      color: 'blue',
      msg: this.CLIP_UPLOADING_MESSAGE
    });
    this.isProcessingRequest$.next(true);

    const [task, fileRef] = this.clipService.uploadClip(this.file);
    this.uploadTask = task;

    this.uploadPercentage$ = this.uploadTask.percentageChanges().pipe(
      map((percent) => (percent ? percent / 100 : 0)),
      finalize(() => (this.uploadPercentage$ = null))
    );

    this.uploadTask
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() =>
          combineLatest([fileRef.getMetadata(), fileRef.getDownloadURL()])
        )
      )
      .subscribe({
        next: async ([fileMetaData, downloadUrl]) => {
          const clip: IClip = {
            uid: this.user?.uuid ?? 'unknow',
            displayName: this.user?.name ?? 'unknow user displayName',
            title: this.title.value,
            fileName: fileMetaData.name,
            url: downloadUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          };

          const clipDocumentRef = await this.clipService.createClip(clip);
          setTimeout(() => {
            this.router.navigate(['clips', clipDocumentRef.id]);
          }, 1000);

          this.alert$.next({
            color: 'green',
            msg: 'Success! Your clip is now ready to be shared with the world.',
            show: true
          });
        },
        error: (err) => {
          this.uploadForm.enable();
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
