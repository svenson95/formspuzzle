import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'fp-start-page',
  template: `
    <section id="home-header">FormsPuzzle</section>
    <section id="home-menu">
      <ion-button data-testid="play-button" routerLink="/choose-map">
        SPIELEN
      </ion-button>
    </section>
  `,
  styles: `
    #home-header {
      font-size: 2rem;
      font-weight: 900;
      text-align: center;
      padding-block: 3rem;
    }

    #home-menu {
      position: absolute;
      transform: translateY(-80%);
      top: 80%;
      left: 0;
      right: 0;

      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonButton, RouterLink],
})
export class StartPage {}
