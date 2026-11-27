import { Injectable } from '@angular/core';

export interface ItemPedido {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Pedido {
  folio: string;
  cliente: string;
  estado: 'Pendiente' | 'En preparación' | 'Listo' | 'Entregado';
  tipoServicio: 'Para llevar' | 'En el local';
  items: ItemPedido[];
  observaciones?: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidos: Pedido[] = [
    {
      folio: 'PED-001',
      cliente: 'Mesa 4 - Carlos',
      estado: 'En preparación',
      tipoServicio: 'En el local',
      items: [
        { nombre: 'Cappuccino Tradicional', cantidad: 2, precio: 55.00 },
        { nombre: 'Panini de Jamón Serrano', cantidad: 1, precio: 75.00 }
      ],
      observaciones: 'Sin cebolla en el panini',
      total: 185.00
    }
  ];

  obtenerPedidos(): Pedido[] {
    return this.pedidos;
  }

  agregarPedido(nuevo: Omit<Pedido, 'folio' | 'total'>): void {
    const numero = (this.pedidos.length + 1).toString().padStart(3, '0');
    const total = nuevo.items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    this.pedidos.unshift({
      ...nuevo,
      folio: `PED-${numero}`,
      total
    });
  }
}