import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonApp, IonContent, IonRouterOutlet } from '@ionic/angular/standalone';

import { PuzzleService } from './services';

@Component({
  selector: 'fp-root',
  template: `
    <ion-app>
      <ion-content [fullscreen]="true">
        <ion-router-outlet></ion-router-outlet>
      </ion-content>
    </ion-app>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonContent, IonRouterOutlet],
  providers: [PuzzleService],
})
export class AppComponent {}
