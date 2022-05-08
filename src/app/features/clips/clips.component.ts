import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipsComponent {
  videoId: number | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}
}
