import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IClip } from 'src/app/models/clip.model';
import videojs from 'video.js';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.component.html',
  styleUrls: ['./clips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class ClipsComponent implements OnInit {
  @ViewChild('videoPlayer', { static: true })
  videoPlayerRef!: ElementRef<HTMLVideoElement>;

  player?: videojs.Player;
  videoId: number | null = null;
  clip?: IClip;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.player = videojs(this.videoPlayerRef.nativeElement);
    this.activatedRoute.data.subscribe((data) => {
      this.clip = data['clip'] as IClip;

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      });
    });
  }
}
