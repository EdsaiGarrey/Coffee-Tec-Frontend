import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PedidosService, Pedido } from './pedidos.service';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConfirmModal],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosComponent implements OnInit {
  private pedidosService = inject(PedidosService);

  pedidos = signal<any[]>([]);
  modal = signal<'ver' | 'editar' | 'eliminar' | null>(null);
  sel = signal<any>(null);

  ngOnInit(): void {
    const lista = this.pedidosService.obtenerPedidos().map(p => ({
      ...p,
      servicio: p.tipoServicio,
      hora: '10:45',
      responsable: 'Ana Torres'
    }));
    this.pedidos.set(lista);
  }

  abrir(tipo: 'ver' | 'editar' | 'eliminar', pedido: any): void {
    this.sel.set(pedido);
    this.modal.set(tipo);
  }

  cerrar(): void {
    this.modal.set(null);
    this.sel.set(null);
  }

  eliminar(): void {
    const actual = this.sel();
    if (actual) {
      this.pedidos.update(lista => lista.filter(p => p.folio !== actual.folio));
    }
    this.cerrar();
  }

  clase(estado: string): string {
    switch (estado) {
      case 'Pendiente': return 'pendiente';
      case 'En preparación': return 'preparacion';
      case 'Listo': return 'listo';
      case 'Entregado': return 'entregado';
      default: return '';
    }
  }
}