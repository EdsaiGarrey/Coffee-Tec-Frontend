import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario {
  categorias = ['Todas', 'Bebida Fria', 'Bebida Caliente', 'Jugo Natural', 'Infusiones', 'Tortas y Pasteles',
    'Sandwiches', 'Panadería', 'Frutas y Yogur', 'Promociones del Día', 'Combos', 'Postres Especiales'];
  filtro = signal('Todas');

  insumos = [
    { insumo: 'Harina de Trigo', categoria: 'Panadería', stock: '1,250 kg', mov: 'Entrada: 12/10/2023' },
    { insumo: 'Azúcar Blanca', categoria: 'Panadería', stock: '450 kg', mov: 'Entrada: 10/10/2023' },
    { insumo: 'Levadura Seca', categoria: 'Panadería', stock: '12 kg', mov: 'Salida: 12/10/2023' },
    { insumo: 'Sal de Mar', categoria: 'Panadería', stock: '85 kg', mov: 'Entrada: 08/10/2023' },
  ];

  visibles = computed(() =>
    this.filtro() === 'Todas' ? this.insumos : this.insumos.filter(i => i.categoria === this.filtro())
  );
}