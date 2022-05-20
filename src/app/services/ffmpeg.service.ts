import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile, FFmpeg } from '@ffmpeg/ffmpeg';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  private _ffmpeg: FFmpeg;

  private _isReadyBehaviourSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isReady$: Observable<boolean> = this._isReadyBehaviourSubject.asObservable();

  constructor() {
    this._ffmpeg = createFFmpeg({ log: true });
  }

  async init(): Promise<void> {
    if (this._isReadyBehaviourSubject.getValue()) {
      return;
    }

    await this._ffmpeg.load();
    this._isReadyBehaviourSubject.next(true);
  }

  async getScreenShots(file: File): Promise<string[]> {
    const data = await fetchFile(file);

    this._ffmpeg.FS('writeFile', file.name, data);

    const seconds: number[] = [1, 2, 3];
    const commands: string[] = [];

    seconds.forEach((second) => {
      commands.push(
        // Input
        '-i',
        file.name,
        // Output options
        '-ss',
        `00:00:0${second}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=510:-1',
        // Output
        `output_0${second}.png`
      );
    });

    await this._ffmpeg.run(...commands);

    const screenshots: string[] = [];

    seconds.forEach((second) => {
      const screenshotFile: Uint8Array = this._ffmpeg.FS(
        'readFile',
        `output_0${second}.png`
      );

      const screenshotBlob: Blob = new Blob([screenshotFile.buffer], {
        type: 'image/png'
      });

      const screenshotURL: string = URL.createObjectURL(screenshotBlob);
      screenshots.push(screenshotURL);
    });

    return screenshots;
  }

  async blobFromURL(url: string): Promise<Blob> {
    const response: Response = await fetch(url);
    const blob: Blob = await response.blob();

    return blob;
  }
}
