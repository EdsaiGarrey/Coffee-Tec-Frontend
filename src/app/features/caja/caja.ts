import { Component, computed, signal } from '@angular/core';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';

type Metodo = 'Efectivo' | 'Tarjeta' | 'Transferencia';

@Component({
  selector: 'app-caja',
  imports: [ConfirmModal],
  templateUrl: './caja.html',
  styleUrl: './caja.css',
})
export class Caja {
  abierta = signal(true);
  confirmando = signal(false);

  abrir() { this.abierta.set(true); }
  cerrar() { this.abierta.set(false); this.confirmando.set(false); }

  filtros: ('Todos' | Metodo)[] = ['Todos', 'Efectivo', 'Tarjeta', 'Transferencia'];
  filtro = signal<'Todos' | Metodo>('Todos');

  movimientos = [
    { pedido: '#0041', hora: '21:58', metodo: 'Efectivo' as Metodo, detalle: 'Recibido $200.00 · Cambio $50.00', monto: 150 },
    { pedido: '#0042', hora: '22:10', metodo: 'Efectivo' as Metodo, detalle: 'Recibido $300.00 · Cambio $0.00', monto: 300 },
    { pedido: '#0043', hora: '22:25', metodo: 'Tarjeta' as Metodo, detalle: 'Débito', monto: 180 },
    { pedido: '#0044', hora: '22:40', metodo: 'Tarjeta' as Metodo, detalle: 'Crédito', monto: 200 },
    { pedido: '#0045', hora: '22:55', metodo: 'Transferencia' as Metodo, detalle: 'SPEI', monto: 220 },
  ];

  visibles = computed(() =>
    this.filtro() === 'Todos' ? this.movimientos : this.movimientos.filter(m => m.metodo === this.filtro())
  );

  clase(m: Metodo) { return m === 'Efectivo' ? 'efectivo' : m === 'Tarjeta' ? 'tarjeta-m' : 'transf'; }
}