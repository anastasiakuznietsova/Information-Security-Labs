import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Lab1Component } from './lab1/lab1.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },  
  { path: 'lab1', component: Lab1Component },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
