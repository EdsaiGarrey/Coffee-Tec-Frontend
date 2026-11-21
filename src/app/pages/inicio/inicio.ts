
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  private readonly productoService = inject(ProductoService);
  private readonly cdr = inject(ChangeDetectorRef);

  productos: Producto[] = [];
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.error = '';

    this.productoService.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
        this.cargando = false;

        // Avisar a Angular que debe actualizar la pantalla.
        this.cdr.markForCheck();
      },
      error: (err: Error) => {
        this.error = err.message;
        this.cargando = false;

        this.cdr.markForCheck();
      }
    });
  }
}
