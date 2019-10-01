import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrawingComponent } from './drawing/drawing.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'drawing'
  },
  {
    path: 'drawing',
    component: DrawingComponent, data: { animation: 'isLeft' }
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
