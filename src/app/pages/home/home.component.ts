import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  videoSrc = '/videos/video-header-optimized.mp4'; // chemin dans public ou assets selon ta config

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    // Autoplay "safe" pour Chrome et Safari
    video.muted = true;
    video.autoplay = true;
    video.loop = true;

    video.play().catch((err) => {
      console.warn('Autoplay bloqué :', err);
    });
  }

  onVideoLoaded() {
    console.log('Vidéo chargée et prête 🎉');
  }
}
