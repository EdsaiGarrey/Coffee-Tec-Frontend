import { Component, signal } from '@angular/core';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';

type Estado = 'Pendiente' | 'En preparación' | 'Listo' | 'Entregado';
interface Pedido {
  folio: string; cliente: string; servicio: string; estado: Estado;
  total: number; hora: string; responsable: string;
}

@Component({
  selector: 'app-pedidos',
  imports: [ConfirmModal],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos {
  pedidos = signal<Pedido[]>([
    { folio: '#P-000245', cliente: 'María Rodríguez', servicio: 'Para llevar', estado: 'Pendiente', total: 185, hora: '10:45', responsable: 'Ana Torres' },
    { folio: '#P-000244', cliente: 'Juan Pérez', servicio: 'En mesa', estado: 'En preparación', total: 240.5, hora: '10:30', responsable: 'Carlos Gómez' },
    { folio: '#P-000243', cliente: 'Lucía Fernández', servicio: 'Para llevar', estado: 'Listo', total: 95, hora: '10:20', responsable: 'Ana Torres' },
    { folio: '#P-000242', cliente: 'Carlos Gómez', servicio: 'En mesa', estado: 'Pendiente', total: 310, hora: '10:10', responsable: 'Juan Pérez' },
    { folio: '#P-000241', cliente: 'Ana Torres', servicio: 'Para llevar', estado: 'En preparación', total: 125, hora: '09:50', responsable: 'Carlos Gómez' },
    { folio: '#P-000240', cliente: 'Pedro Ramírez', servicio: 'En mesa', estado: 'Listo', total: 265, hora: '09:40', responsable: 'Ana Torres' },
    { folio: '#P-000239', cliente: 'Sofía Herrera', servicio: 'Para llevar', estado: 'Entregado', total: 180, hora: '09:30', responsable: 'Juan Pérez' },
    { folio: '#P-000238', cliente: 'Miguel Ángel', servicio: 'En mesa', estado: 'Entregado', total: 220, hora: '09:20', responsable: 'Carlos Gómez' },
    { folio: '#P-000236', cliente: 'Diego Morales', servicio: 'En mesa', estado: 'Entregado', total: 330, hora: '09:00', responsable: 'Juan Pérez' },
  ]);

  modal = signal<'ver' | 'editar' | 'eliminar' | null>(null);
  sel = signal<Pedido | null>(null);

  abrir(tipo: 'ver' | 'editar' | 'eliminar', p: Pedido) { this.sel.set(p); this.modal.set(tipo); }
  cerrar() { this.modal.set(null); }
  eliminar() {
    this.pedidos.update(l => l.filter(p => p !== this.sel()));
    this.cerrar();
  }
  clase(e: Estado) {
    return { 'Pendiente': 'pendiente', 'En preparación': 'prep', 'Listo': 'listo', 'Entregado': 'entregado' }[e];
  }
}