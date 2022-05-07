import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/compat/firestore';
import { IClip } from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  private readonly CLIPS_COLLECTION_ID = 'clips';

  private _clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private angularFirestore: AngularFirestore) {
    this._clipsCollection = this.angularFirestore.collection(
      this.CLIPS_COLLECTION_ID
    );
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this._clipsCollection.add(data);
  }
}
