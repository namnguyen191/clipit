import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryDocumentSnapshot
} from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private readonly CLIPS_COLLECTION_ID = 'clips';

  private _clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
    this._clipsCollection = this.angularFirestore.collection(
      this.CLIPS_COLLECTION_ID
    );
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this._clipsCollection.add(data);
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
}
