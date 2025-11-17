import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoMedicionesPage } from './listado-mediciones.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoMedicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoMedicionesPageRoutingModule { }
