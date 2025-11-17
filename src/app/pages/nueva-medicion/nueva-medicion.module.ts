import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaMedicionPageRoutingModule } from './nueva-medicion-routing.module';

import { NuevaMedicionPage } from './nueva-medicion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    NuevaMedicionPageRoutingModule
  ],
  declarations: [NuevaMedicionPage]
})
export class NuevaMedicionPageModule { }
