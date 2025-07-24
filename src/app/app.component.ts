import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;
  tooltipVisible = false;

  showTooltip(event: MouseEvent, text: string) {
    this.tooltipText = text;
    this.tooltipX = event.pageX + 10;
    this.tooltipY = event.pageY + 10;
    this.tooltipVisible = true;
  }

  hideTooltip() {
    this.tooltipVisible = false;
  }

  // burger
  burgerDisplay = signal(false);
  burgerState = signal(0);
  burgerIcons = ['/icons/burger-bar-open.svg', '/icons/burger-bar-close.svg'];
  burgerSrc = signal(this.burgerIcons[this.burgerState()]);

  toggleBurger = () => {
    const newState = this.burgerState() === 0 ? 1 : 0;
    this.burgerState.set(newState);
    this.burgerSrc.set(this.burgerIcons[newState]);
    this.burgerDisplay.set(!this.burgerDisplay());
  };

  constructor() {
    // Gestion de resize : fermer le burger menu si largeur > 920px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920 && this.burgerDisplay()) {
        this.burgerDisplay.set(false);
        this.burgerState.set(0);
        this.burgerSrc.set(this.burgerIcons[0]);
      }
    });

    // Clic hors du burger
    document.addEventListener('click', (event: MouseEvent) => {
      const formElement = document.querySelector('#second-nav');
      const target = event.target as HTMLElement;

        if (
          this.burgerDisplay() && // Burger visible
          formElement &&
          !formElement.contains(target) // Clic à l'extérieur
        ) {
          this.burgerDisplay.set(false);
        }
    });
  }
}

