import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckroadComponent } from './truckroad/truckroad.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'route', component: TruckroadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
