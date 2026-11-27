export type Rol = 'admin' | 'gerente' | 'empleado';

export const MENU: Record<Rol, { label: string; ruta: string }[]> = {
  admin: [
    { label: 'Panel Principal', ruta: '/dashboard' },
    { label: 'Usuarios', ruta: '/usuarios' },
    { label: 'Categorías', ruta: '/categorias' },
    { label: 'Productos', ruta: '/productos' },
    { label: 'Pedidos', ruta: '/pedidos' },
    { label: 'Inventario', ruta: '/inventario' },
    { label: 'Caja', ruta: '/caja' },
  ],
  gerente: [
    { label: 'Panel Principal', ruta: '/dashboard' },
    { label: 'Productos', ruta: '/productos' },
    { label: 'Pedidos', ruta: '/pedidos' },
    { label: 'Caja', ruta: '/caja' },
  ],
  empleado: [
    { label: 'Panel de Control', ruta: '/dashboard' },
    { label: 'Ventas', ruta: '/ventas' },
    { label: 'Pedidos', ruta: '/pedidos' },
    { label: 'Caja', ruta: '/caja' },
  ],
};