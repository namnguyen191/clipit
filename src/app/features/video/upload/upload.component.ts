import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadComponent {
  isDragOver: boolean = false;
  file: File | null = null;
  formEnabled: boolean = false;

  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  uploadForm = new FormGroup({
    title: this.title
  });

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

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.angularFireStorage.upload(clipPath, this.file );
  }
}
