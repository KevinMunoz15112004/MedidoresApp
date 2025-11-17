import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoMedicionesPageRoutingModule } from './listado-mediciones-routing.module';

import { ListadoMedicionesPage } from './listado-mediciones.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ListadoMedicionesPageRoutingModule
  ],
  declarations: [ListadoMedicionesPage]
})
export class ListadoMedicionesPageModule { }
