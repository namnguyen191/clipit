import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

type SortOder = 'desc' | 'asc';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent implements OnInit {
  readonly EDIT_MODAL_ID = 'editModal';

  videosSortOrder: SortOder = 'asc';
  clips$: BehaviorSubject<IClip[]> = new BehaviorSubject<IClip[]>([]);
  activeClip$: Subject<IClip | null> = new Subject<IClip | null>();

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private clipService: ClipService,
    private modalService: ModalService
  ) {
    this.clipService
      .getUserClips()
      .pipe(
        map(
          (clipDocs) =>
            clipDocs?.map((doc) => ({ ...doc.data(), docID: doc.id })) ?? null
        )
      )
      .subscribe((clips) => this.clips$.next(clips ?? []));
  }

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe((prs) => {
      const sortParam = prs.get('sort');
      if (sortParam && (sortParam === 'asc' || sortParam === 'desc')) {
        this.videosSortOrder = sortParam;
      }
    });
  }

  sort(e: Event) {
    const { value } = e.target as HTMLSelectElement;
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: {
        sort: value
      }
    });
  }

  onEditLinkClick(event: Event, clip: IClip) {
    event.preventDefault();

    this.activeClip$.next({ ...clip });
    this.modalService.showModal(this.EDIT_MODAL_ID);
  }

  // TODO: add confirmation modal before delete and error handling
  onDeleteLinkClick(event: Event, clip: IClip) {
    event.preventDefault();

    this.clipService.deleteClip(clip).subscribe({
      next: () => {
        const newClips = this.clips$
          .getValue()
          .filter((oldClip) => oldClip.docID !== clip.docID);
        this.clips$.next(newClips);
      }
    });
  }

  onClipUpdate(updatedClip: Partial<IClip>) {
    const oldClips = this.clips$.getValue();
    const updatedIndex = oldClips.findIndex(
      (oldClip) => oldClip.docID === updatedClip.docID
    );
    oldClips[updatedIndex] = { ...oldClips[updatedIndex], ...updatedClip };
    this.clips$.next(oldClips);
  }
}
