import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PedidosService, ItemPedido } from '../pedidos.service';

@Component({
  selector: 'app-pedido-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedido-nuevo.html',
  styleUrl: './pedido-nuevo.css'
})
export class PedidoNuevoComponent {
  private pedidosService = inject(PedidosService);
  private router = inject(Router);

  cliente = '';
  tipoServicio: 'Para llevar' | 'En el local' = 'En el local';
  observaciones = '';

  // Catálogo rápido de ejemplo (puedes conectarlo luego a tu servicio de productos)
  catalogo = [
    { nombre: 'Cappuccino Tradicional', precio: 55.00 },
    { nombre: 'Americano', precio: 40.00 },
    { nombre: 'Latte Vainilla', precio: 60.00 },
    { nombre: 'Panini de Jamón Serrano', precio: 75.00 },
    { nombre: 'Croissant de Mantequilla', precio: 45.00 }
  ];

  productoSeleccionado = this.catalogo[0].nombre;
  cantidad = 1;
  items: ItemPedido[] = [];

  agregarItem(): void {
    const prod = this.catalogo.find(p => p.nombre === this.productoSeleccionado);
    if (!prod || this.cantidad < 1) return;

    const existente = this.items.find(i => i.nombre === prod.nombre);
    if (existente) {
      existente.cantidad += this.cantidad;
    } else {
      this.items.push({
        nombre: prod.nombre,
        cantidad: this.cantidad,
        precio: prod.precio
      });
    }
    this.cantidad = 1;
  }

  eliminarItem(index: number): void {
    this.items.splice(index, 1);
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + (i.cantidad * i.precio), 0);
  }

  guardarPedido(): void {
    if (!this.cliente.trim() || this.items.length === 0) return;

    this.pedidosService.agregarPedido({
      cliente: this.cliente,
      estado: 'Pendiente',
      tipoServicio: this.tipoServicio,
      items: this.items,
      observaciones: this.observaciones.trim() || undefined
    });

    this.router.navigate(['/pedidos']);
  }
}