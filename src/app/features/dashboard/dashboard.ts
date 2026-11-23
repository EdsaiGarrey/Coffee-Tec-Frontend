import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  rol = inject(AuthService).rol;

  meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  valores = [32,28,35,40,45,48,44,42,46,50,47,52];
  puntos = this.valores.map((v, i) => ({ x: 40 + i * 48, y: 180 - v * 2.8, v }));
  linea = this.puntos.map(p => `${p.x},${p.y}`).join(' ');

  recientes = [
    { id: '00001', cliente: 'edsai alejandro', estado: 'pendiente', fecha: '01-07-2026' },
    { id: '00002', cliente: 'uriel eduardo', estado: 'entregado', fecha: '01-07-2026' },
    { id: '00003', cliente: 'jose luis', estado: 'pendiente', fecha: '01-07-2026' },
    { id: '00004', cliente: 'angelica', estado: 'pendiente', fecha: '01-07-2026' },
    { id: '00005', cliente: 'natalia', estado: 'entregado', fecha: '01-07-2026' },
  ];

  accesos = [
    { titulo: 'Nueva venta', texto: 'Inicia una nueva venta de productos.', ruta: '/ventas', icono: '🛒' },
    { titulo: 'Ver pedidos', texto: 'Consulta y gestiona pedidos pendientes.', ruta: '/pedidos', icono: '🛍' },
    { titulo: 'Registrar pago', texto: 'Registra pagos de pedidos o ventas.', ruta: '/caja', icono: '💳' },
  ];
}