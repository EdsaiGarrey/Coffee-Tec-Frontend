import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  activo: boolean;
  imagen: string | null;
}

export type ProductoForm = Omit<Producto, 'id'>;

export const CATEGORIAS = [
  'Bebida Fria', 'Bebida Caliente', 'Jugo Natural', 'Infusiones', 'Tortas y Pasteles',
  'Sandwiches', 'Panadería', 'Frutas y Yogur', 'Promociones del Día', 'Combos', 'Postres Especiales',
];

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private siguienteId = 4;

  private readonly _productos = signal<Producto[]>([
    { id: 1, nombre: 'Capuchino Grande', descripcion: '', categoria: 'Bebida Caliente', precio: 45000, activo: true, imagen: null },
    { id: 2, nombre: 'Panini de Jamón Serrano', descripcion: 'Pan artesanal con jamón serrano', categoria: 'Sandwiches', precio: 75, activo: true, imagen: null },
    { id: 3, nombre: 'Café frío de moka', descripcion: 'Moka con hielo', categoria: 'Bebida Fria', precio: 65, activo: false, imagen: null },
  ]);

  readonly productos = this._productos.asReadonly();

  // Cuando exista el backend, estos métodos cambian a HttpClient (get/post/put/delete)
  // y siguen devolviendo Observable, así que la pantalla no se toca.
  crear(datos: ProductoForm): Observable<Producto> {
    const nuevo: Producto = { id: this.siguienteId++, ...datos };
    this._productos.update(l => [...l, nuevo]);
    return of(nuevo);
  }

  actualizar(id: number, datos: ProductoForm): Observable<Producto> {
    const actualizado: Producto = { id, ...datos };
    this._productos.update(l => l.map(p => (p.id === id ? actualizado : p)));
    return of(actualizado);
  }

  eliminar(id: number): Observable<void> {
    this._productos.update(l => l.filter(p => p.id !== id));
    return of(void 0);
  }
}