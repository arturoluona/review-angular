import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MunicipalityRoutingModule} from './municipality-routing.module';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './modals/add/add.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    MunicipalityRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class MunicipalityModule {
}
