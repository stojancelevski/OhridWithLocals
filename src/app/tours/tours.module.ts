import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateTourComponent} from './create-tour/create-tour.component';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: 'create-tour', component: CreateTourComponent},


];

@NgModule({
  declarations: [
    CreateTourComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ToursModule {
}
