import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { fade, slide } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slide
  ]
})
export class AppComponent {
  rows: number;
  title = 'app';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setRows();
  }

  constructor() {
    this.setRows();
  }

  setRows() {
    this.rows = Math.round(window.innerWidth / (window.innerWidth > 900 ? 100 : 50));
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
