import { Injectable, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateSerieComponent } from './create-serie/create-serie.component';
import { DetailSerieComponent } from './detail-serie/detail-serie.component';
import { IndexSerieComponent } from './index-serie/index-serie.component';

const routes: Routes = [
  { 
    path: 'series', 
    component: IndexSerieComponent 
  },
  {
    path:'series/serie',
    component: CreateSerieComponent
  },
  {
    path:'series/serie/:id',
    component: CreateSerieComponent
  },
  {
    path:'series/:id',
    component: DetailSerieComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
