import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateTourComponent} from './create-tour/create-tour.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DayTripsComponent} from './day-trips/day-trips.component';
import {AdventureComponent} from './adventure/adventure.component';
import {NightComponent} from './night/night.component';
import {FoodComponent} from './food/food.component';
import {FoodPlacesComponent} from './food-places/food-places.component';
import {ButtonComponent} from '../button/button.component';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {path: 'create-tour', component: CreateTourComponent},
  {path: 'daily-tours', component: DayTripsComponent},
  {path: 'night-tours', component: NightComponent},
  {path: 'adventure-tours', component: AdventureComponent},
  {path: 'foodies', component: FoodComponent},


];

@NgModule({
  declarations: [
    CreateTourComponent,
    DayTripsComponent,
    AdventureComponent,
    NightComponent,
    FoodComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ToursModule {
}
