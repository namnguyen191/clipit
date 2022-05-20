import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap
} from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { IUserData } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClipService } from 'src/app/services/clip.service';
import { FfmpegService } from 'src/app/services/ffmpeg.service';
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
  screenshots$: Observable<string[]> = of([]);
  isProcessingVideo$: Subject<boolean> = new Subject<boolean>();
  selectedScreenshot$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  // alert
  alert$: Subject<IAlert> = new Subject<IAlert>();
  // form
  formEnabled: boolean = false;
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup({
    title: this.title
  });
  isProcessingRequest$: Subject<boolean> = new Subject<boolean>();
  uploadPercentage$: Subject<number> = new Subject<number>();
  // TODO: implement canDeactivate guard when the upload task is in progress
  videoUploadTask: AngularFireUploadTask | null = null;
  screenshotUploadTask: AngularFireUploadTask | null = null;

  constructor(
    private authService: AuthService,
    private clipService: ClipService,
    private router: Router,
    public ffmpegSevice: FfmpegService
  ) {
    this.authService.user$.subscribe((usr) => (this.user = usr));
    this.ffmpegSevice.init();
  }

  ngOnDestroy(): void {
    if (this.videoUploadTask) {
      this.videoUploadTask.cancel();
    }

    if (this.screenshotUploadTask) {
      this.screenshotUploadTask.cancel();
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

  async setFile(file: File | null): Promise<void> {
    if (!file) return;

    this.file = file;
    if (this.file.type !== 'video/mp4') {
      console.log('Nam data is: ', this.file?.type);
      return;
    }

    this.isProcessingVideo$.next(true);
    const screenshots = await this.ffmpegSevice.getScreenShots(this.file);
    this.screenshots$ = of(screenshots);
    this.selectedScreenshot$.next(screenshots[0]);
    this.isProcessingVideo$.next(true);

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.formEnabled = true;
  }

  async uploadFile(): Promise<void> {
    if (!this.file) return;

    this.uploadForm.disable();

    this.alert$.next({
      show: true,
      color: 'blue',
      msg: this.CLIP_UPLOADING_MESSAGE
    });
    this.isProcessingRequest$.next(true);

    const screenshotBlob = await this.ffmpegSevice.blobFromURL(
      this.selectedScreenshot$.getValue()!
    );

    const [videoTask, videoFileRef] = this.clipService.uploadClip(this.file);
    this.videoUploadTask = videoTask;

    const [screenshotTask, screenshotFileRef] =
      this.clipService.uploadScreenshot(screenshotBlob);
    this.screenshotUploadTask = screenshotTask;

    combineLatest([
      this.videoUploadTask.percentageChanges(),
      this.screenshotUploadTask.percentageChanges()
    ])
      .pipe(
        map(([videoPercent, screenshotPercent]) => {
          const result = ((videoPercent || 0) + (screenshotPercent || 0)) / 200;
          return result;
        })
      )
      .subscribe((val) => this.uploadPercentage$.next(val));

    forkJoin([
      this.videoUploadTask.snapshotChanges(),
      this.screenshotUploadTask.snapshotChanges()
    ])
      .pipe(
        switchMap(() =>
          forkJoin([
            videoFileRef.getDownloadURL(),
            videoFileRef.getMetadata(),
            screenshotFileRef.getDownloadURL(),
            screenshotFileRef.getMetadata()
          ])
        )
      )
      .subscribe({
        next: async ([
          videoDownloadURL,
          videoMetadata,
          screenshotDownloadURL,
          screenshotMetadata
        ]) => {
          this.isProcessingRequest$.next(false);

          const clip: IClip = {
            uid: this.user?.uuid ?? 'unknow',
            displayName: this.user?.name ?? 'unknow user displayName',
            title: this.title.value,
            fileName: videoMetadata['name'],
            url: videoDownloadURL,
            screenshotURL: screenshotDownloadURL,
            screenshotFileName: screenshotMetadata['name'],
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
          this.isProcessingRequest$.next(false);

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
