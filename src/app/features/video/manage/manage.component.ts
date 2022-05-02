import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type SortOder = 'desc' | 'asc';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent implements OnInit {
  videosSortOrder: SortOder = 'asc';

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

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
