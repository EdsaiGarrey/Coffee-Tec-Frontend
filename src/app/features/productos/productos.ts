import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmModal } from '../../shared/components/confirm-modal/confirm-modal';
import { AuthService } from '../../core/services/auth.service';
import { CATEGORIAS, Producto, ProductoForm, ProductosService } from './productos.service';

type CampoForm = 'categoria' | 'precio' | 'nombre' | 'descripcion';

@Component({
  selector: 'app-productos',
  imports: [ConfirmModal, ReactiveFormsModule, DecimalPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  private fb = inject(FormBuilder);
  private service = inject(ProductosService);
  rol = inject(AuthService).rol;

  categorias = CATEGORIAS;
  productos = this.service.productos;

  // Filtros
  busqueda = signal('');
  filtroCategoria = signal('');
  filtroEstado = signal<'todos' | 'activos' | 'inactivos'>('todos');

  total = computed(() => this.productos().length);
  activos = computed(() => this.productos().filter(p => p.activo).length);
  inactivos = computed(() => this.total() - this.activos());

  visibles = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const cat = this.filtroCategoria();
    const estado = this.filtroEstado();
    return this.productos().filter(p =>
      (!q || p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)) &&
      (!cat || p.categoria === cat) &&
      (estado === 'todos' || (estado === 'activos') === p.activo)
    );
  });

  // Modal y formulario
  modal = signal<'agregar' | 'editar' | 'eliminar' | null>(null);
  sel = signal<Producto | null>(null);
  imagen = signal<string | null>(null);
  errorImagen = signal('');

  form = this.fb.nonNullable.group({
    categoria: ['', Validators.required],
    precio: [null as number | null, [Validators.required, Validators.min(0.01)]],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    descripcion: ['', Validators.maxLength(200)],
    activo: [true],
  });

  // Vista del gerente (solo lectura, pág. 23 del PDF)
  listaGerente = [
    { id: '00001', tipo: 'BEBIDA', producto: 'cafes americano', fecha: '01-07-2026' },
    { id: '00002', tipo: 'BEBIDA', producto: 'pastel', fecha: '01-07-2026' },
    { id: '00003', tipo: 'postre', producto: 'pan', fecha: '01-07-2026' },
    { id: '00004', tipo: 'bebida', producto: 'cafe black', fecha: '01-07-2026' },
    { id: '00005', tipo: 'postre', producto: 'cafe frio de moka', fecha: '01-07-2026' },
  ];

  invalido(campo: CampoForm) {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  abrir(tipo: 'agregar' | 'editar' | 'eliminar', p: Producto | null = null) {
    this.sel.set(p);
    this.errorImagen.set('');
    if (tipo === 'agregar') {
      this.form.reset({ categoria: '', precio: null, nombre: '', descripcion: '', activo: true });
      this.imagen.set(null);
    }
    if (tipo === 'editar' && p) {
      this.form.reset({
        categoria: p.categoria, precio: p.precio, nombre: p.nombre,
        descripcion: p.descripcion, activo: p.activo,
      });
      this.imagen.set(p.imagen);
    }
    this.modal.set(tipo);
  }

  cerrar() {
    this.modal.set(null);
    this.sel.set(null);
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const datos: ProductoForm = {
      nombre: v.nombre.trim(),
      descripcion: v.descripcion.trim(),
      categoria: v.categoria,
      precio: Number(v.precio),
      activo: v.activo,
      imagen: this.imagen(),
    };
    const actual = this.sel();
    const peticion = this.modal() === 'editar' && actual
      ? this.service.actualizar(actual.id, datos)
      : this.service.crear(datos);
    peticion.subscribe(() => this.cerrar());
  }

  eliminar() {
    const p = this.sel();
    if (!p) return;
    this.service.eliminar(p.id).subscribe(() => this.cerrar());
  }

  // Imagen (opcional)
  elegir(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const f = input.files?.[0];
    if (f) this.leer(f);
    input.value = '';
  }

  soltar(ev: DragEvent) {
    ev.preventDefault();
    const f = ev.dataTransfer?.files?.[0];
    if (f) this.leer(f);
  }

  quitarImagen() {
    this.imagen.set(null);
  }

  private leer(f: File) {
    this.errorImagen.set('');
    if (!f.type.startsWith('image/')) {
      this.errorImagen.set('El archivo debe ser una imagen.');
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      this.errorImagen.set('La imagen no debe pesar más de 2 MB.');
      return;
    }
    const lector = new FileReader();
    lector.onload = () => this.imagen.set(lector.result as string);
    lector.readAsDataURL(f);
  }
}