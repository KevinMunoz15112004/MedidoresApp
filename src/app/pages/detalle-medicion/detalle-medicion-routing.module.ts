import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMedicionPage } from './detalle-medicion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMedicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMedicionPageRoutingModule { }
