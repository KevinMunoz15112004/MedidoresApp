import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMedicionPageRoutingModule } from './detalle-medicion-routing.module';

import { DetalleMedicionPage } from './detalle-medicion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DetalleMedicionPageRoutingModule
  ],
  declarations: [DetalleMedicionPage]
})
export class DetalleMedicionPageModule { }
