import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';

interface Categoria { nombre: string; slug: string; descripcion: string; activa: boolean; }

@Component({
  selector: 'app-categorias',
  imports: [RouterLink, ConfirmModal],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias {
  categorias = signal<Categoria[]>([
    { nombre: 'Bebidas calientes', slug: 'bebidas-calientes', descripcion: 'cafe caliente delicioso, exquisito y de mejor calidad', activa: true },
    { nombre: 'Bebidas Calientes Azucaradas', slug: 'bebidas-calientes-azucaradas', descripcion: 'yutuo', activa: true },
    { nombre: 'Bebidas Frias', slug: 'bebidas-frias', descripcion: 'djsnJGn', activa: false },
  ]);

  modal = signal<'editar' | 'eliminar' | null>(null);
  sel = signal<Categoria | null>(null);

  abrir(t: 'editar' | 'eliminar', c: Categoria) { this.sel.set(c); this.modal.set(t); }
  cerrar() { this.modal.set(null); }
  eliminar() { this.categorias.update(l => l.filter(c => c !== this.sel())); this.cerrar(); }
}