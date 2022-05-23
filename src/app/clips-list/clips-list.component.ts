import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  Observable,
  Subject,
  takeUntil,
  tap
} from 'rxjs';
import { IClip } from '../models/clip.model';
import { ClipService } from '../services/clip.service';

@Component({
  selector: 'app-clips-list',
  templateUrl: './clips-list.component.html',
  styleUrls: ['./clips-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class ClipsListComponent implements OnInit, OnDestroy {
  ngDestroyed$: Subject<boolean> = new Subject<boolean>();
  prevDocId: string | undefined;

  private _clipsSource: BehaviorSubject<IClip[]> = new BehaviorSubject<IClip[]>(
    []
  );
  clips$: Observable<IClip[]> = this._clipsSource.asObservable();

  constructor(private clipsService: ClipService) {}

  ngOnInit(): void {
    this.updateClips();

    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.ngDestroyed$),
        debounceTime(200),
        tap(() => this.handleScroll())
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next(true);
    this.ngDestroyed$.complete();
  }

  handleScroll(): void {
    console.log('Nam data is: handling scroll');

    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const isBottomOfWindow: boolean =
      Math.round(scrollTop) + innerHeight === offsetHeight;

    if (isBottomOfWindow) {
      this.updateClips();
    }
  }

  updateClips(): void {
    const oldClips = this._clipsSource.getValue();

    const lastDocId: string | undefined = oldClips[oldClips.length - 1]?.docID;

    if (lastDocId && lastDocId === this.prevDocId) {
      return;
    }

    this.clipsService
      .getClips({
        lastDocId
      })
      .subscribe((newClips) => {
        this.prevDocId = lastDocId;
        this._clipsSource.next([...oldClips, ...newClips]);
      });
  }
}
