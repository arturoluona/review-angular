import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleRoutingModule} from './vehicle-routing.module';
import { ListComponent } from './pages/list/list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AddComponent} from './modals/add/add.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class VehicleModule {
}
