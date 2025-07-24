import { Component, ViewChild, ElementRef, AfterViewInit, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;
  annee = '@2025'
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

  words: string[] = ['LIBERTÉ', 'ÉQUITÉ', 'VÉRITÉ', 'REJOINDRE', 'MONSIEUR LE MAIRE', 'BARTHÉLÉMY TOYE DIAZ'];
  displayText: string = '';
  wordIndex: number = 0;
  letterIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100; // ms per letter

  ngOnInit() {
    this.typeWord();
  }

  typeWord() {
    const currentWord = this.words[this.wordIndex];
    if (this.isDeleting) {
      this.displayText = currentWord.substring(0, this.letterIndex--);
    } else {
      this.displayText = currentWord.substring(0, this.letterIndex++);
    }

    if (!this.isDeleting && this.letterIndex === currentWord.length + 1) {
      this.isDeleting = true;
      setTimeout(() => this.typeWord(), 3000); // pause before delete
      return;
    }

    if (this.isDeleting && this.letterIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
    }

    setTimeout(() => this.typeWord(), this.isDeleting ? 50 : this.typingSpeed);
  }


  formState = signal(window.innerWidth < 920 ? false : true)
  formDisplay = () => {
    this.formState.set(true)
  }


  constructor() {
    // Gestion de resize : fermer le burger menu si largeur > 920px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) {
        this.formState.set(true);
      } else {
        this.formState.set(false)
      }
    });

    // Clic hors du formulaire
    document.addEventListener('click', (event: MouseEvent) => {
      const formElement = document.querySelector('.adhesion-form');
      const target = event.target as HTMLElement;

      if (
        this.formState() && // Formulaire visible
        formElement &&
        !formElement.contains(target) // Clic à l'extérieur
      ) {
        this.formState.set(false);
      }
    });
  }
}
