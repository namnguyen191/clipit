import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IClip } from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';

type SortOder = 'desc' | 'asc';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent implements OnInit {
  videosSortOrder: SortOder = 'asc';
  clips$: Observable<IClip[] | null>;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private clipService: ClipService
  ) {
    this.clips$ = clipService
      .getUserClips()
      .pipe(
        map(
          (clipDocs) =>
            clipDocs?.map((doc) => ({ ...doc.data(), docID: doc.id })) ?? null
        )
      );
    this.clips$.subscribe((clips) => console.log('Nam data is: ', clips));
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
}
