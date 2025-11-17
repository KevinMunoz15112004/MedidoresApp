import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nueva-medicion',
    loadChildren: () => import('./pages/nueva-medicion/nueva-medicion.module').then(m => m.NuevaMedicionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listado-mediciones',
    loadChildren: () => import('./pages/listado-mediciones/listado-mediciones.module').then(m => m.ListadoMedicionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalle-medicion/:id',
    loadChildren: () => import('./pages/detalle-medicion/detalle-medicion.module').then(m => m.DetalleMedicionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
