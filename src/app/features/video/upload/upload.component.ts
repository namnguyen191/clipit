import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

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
    console.log('Nam data is: file uploaded');
  }
}
