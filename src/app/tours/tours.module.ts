import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateTourComponent} from './create-tour/create-tour.component';

const routes: Routes = [
  {path: 'create-tour', component: CreateTourComponent},


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ToursModule {
}
