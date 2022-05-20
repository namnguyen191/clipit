import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryDocumentSnapshot
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { IClip } from '../models/clip.model';
import { FfmpegService } from './ffmpeg.service';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private readonly CLIPS_COLLECTION_ID = 'clips';

  private _clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private angularFireStorage: AngularFireStorage,
    private ffmpegService: FfmpegService
  ) {
    this._clipsCollection = this.angularFirestore.collection(
      this.CLIPS_COLLECTION_ID
    );
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this._clipsCollection.add(data);
  }

  uploadClip(file: File): [AngularFireUploadTask, AngularFireStorageReference] {
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    return [
      this.angularFireStorage.upload(clipPath, file),
      this.angularFireStorage.ref(clipPath)
    ];
  }

  uploadScreenshot(
    screenshotBlob: Blob
  ): [AngularFireUploadTask, AngularFireStorageReference] {
    const screenshotFileName = uuid();
    const screenshotPath = `screenshots/${screenshotFileName}.png`;

    return [
      this.angularFireStorage.upload(screenshotPath, screenshotBlob),
      this.angularFireStorage.ref(screenshotPath)
    ];
  }

  updateClip(updateClip: Partial<IClip>): Promise<void> {
    return this._clipsCollection.doc(updateClip.docID).update(updateClip);
  }

  getUserClips(): Observable<QueryDocumentSnapshot<IClip>[] | null> {
    return this.angularFireAuth.user.pipe(
      switchMap((usr) => {
        if (!usr) {
          return of(null);
        }
        const query = this._clipsCollection.ref.where('uid', '==', usr.uid);

        return query.get();
      }),
      map((snapshot) => snapshot?.docs ?? null)
    );
  }

  deleteClip(clip: IClip): Observable<string | undefined> {
    const clipRef = this.angularFireStorage.ref(`clips/${clip.fileName}`);
    const screenshotRef = this.angularFireStorage.ref(
      `screenshots/${clip.screenshotFileName}`
    );

    return forkJoin([
      clipRef.delete(),
      screenshotRef.delete(),
      this._clipsCollection.doc(clip.docID).delete()
    ]).pipe(map(() => clip.docID));
  }
}
