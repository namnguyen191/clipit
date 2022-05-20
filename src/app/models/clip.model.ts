import firebase from 'firebase/compat/app';

export interface IClip {
  uid: string;
  displayName: string;
  title: string;
  fileName: string;
  url: string;
  screenshotURL: string;
  screenshotFileName: string;
  timestamp: firebase.firestore.FieldValue;
  docID?: string;
}
