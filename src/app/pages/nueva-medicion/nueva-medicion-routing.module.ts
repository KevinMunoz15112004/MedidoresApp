import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaMedicionPage } from './nueva-medicion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaMedicionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaMedicionPageRoutingModule { }
