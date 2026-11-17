import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
    title: 'Coffee Tec - Inicio'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];