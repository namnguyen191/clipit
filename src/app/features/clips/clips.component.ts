import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClipsComponent implements OnInit {
  videoId: number | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('Nam data is: ', this.activatedRoute.snapshot.params['id']);
  }
}
