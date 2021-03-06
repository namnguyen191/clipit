import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';

@Pipe({
  name: 'fpTimeStamp'
})
export class FpTimeStampPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value?: firebase.firestore.FieldValue): string | null {
    if (!value) return '';

    const date = (value as firebase.firestore.Timestamp).toDate();
    return this.datePipe.transform(date, 'mediumDate');
  }
}
