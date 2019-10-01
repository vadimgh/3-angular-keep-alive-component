import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { HelpComponent } from './help.component';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent, data: { animation: 'isRight' },
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule
  ],
  declarations: [HelpComponent],
  providers: []
})
export class HelpModule { }
