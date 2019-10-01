import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingComponent } from './drawing/drawing.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './custom-reuse-strategy';

@NgModule({
   declarations: [
      AppComponent,
      DrawingComponent
   ],
   imports: [
      BrowserAnimationsModule,
      AppRoutingModule,
      MatButtonModule,
      MatGridListModule,
      MatListModule,
      HttpClientModule
   ],
   providers: [
      { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
