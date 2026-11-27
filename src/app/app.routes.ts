import { Routes } from '@angular/router';
import { MainLayout } from './shared/layouts/main-layout/main-layout';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'recuperar', loadComponent: () => import('./pages/recuperar-password/recuperar-password').then(m => m.RecuperarPassword) },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'pedidos', loadComponent: () => import('./features/pedidos/pedidos').then(m => m.PedidosComponent) },
      { path: 'pedidos/nuevo', loadComponent: () => import('./features/pedidos/pedido-nuevo/pedido-nuevo').then(m => m.PedidoNuevoComponent) },
      { path: 'caja', loadComponent: () => import('./features/caja/caja').then(m => m.Caja) },
      { path: 'usuarios', canActivate: [roleGuard(['admin'])], loadComponent: () => import('./features/usuarios/usuarios').then(m => m.Usuarios) },
      { path: 'usuarios/nuevo', canActivate: [roleGuard(['admin'])], loadComponent: () => import('./features/usuarios/usuario-nuevo/usuario-nuevo').then(m => m.UsuarioNuevo) },
      { path: 'categorias', canActivate: [roleGuard(['admin'])], loadComponent: () => import('./features/categorias/categorias').then(m => m.Categorias) },
      { path: 'categorias/nueva', canActivate: [roleGuard(['admin'])], loadComponent: () => import('./features/categorias/categoria-nueva/categoria-nueva').then(m => m.CategoriaNueva) },
      { path: 'productos', canActivate: [roleGuard(['admin', 'gerente'])], loadComponent: () => import('./features/productos/productos').then(m => m.Productos) },
      { path: 'inventario', canActivate: [roleGuard(['admin'])], loadComponent: () => import('./features/inventario/inventario').then(m => m.Inventario) },
      { path: 'ventas', canActivate: [roleGuard(['empleado'])], loadComponent: () => import('./features/ventas/ventas').then(m => m.Ventas) },
    ],
  },
  { path: '**', redirectTo: 'login' },
];