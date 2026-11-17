export interface Producto {
  idProducto?: number;
  idCategoria: number;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  urlImagen?: string | null;
  stock: number;
  activo?: boolean;
  fechaCreacion?: string;
}