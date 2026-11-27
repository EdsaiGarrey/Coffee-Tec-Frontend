import { Component, computed, signal } from '@angular/core';

interface Item { nombre: string; precio: number; cant: number; }

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas {
  catalogo = [
    { nombre: 'Cappuccino Tradicional', precio: 55 },
    { nombre: 'Americano', precio: 40 },
    { nombre: 'Panini de Jamón Serrano', precio: 75 },
    { nombre: 'Café frío de moka', precio: 65 },
  ];
  carrito = signal<Item[]>([]);
  total = computed(() => this.carrito().reduce((s, i) => s + i.precio * i.cant, 0));

  agregar(p: { nombre: string; precio: number }) {
    this.carrito.update(c => {
      const ex = c.find(i => i.nombre === p.nombre);
      return ex ? c.map(i => i === ex ? { ...i, cant: i.cant + 1 } : i) : [...c, { ...p, cant: 1 }];
    });
  }
  limpiar() { this.carrito.set([]); }
}