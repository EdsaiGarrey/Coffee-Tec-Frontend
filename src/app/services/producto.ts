import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto';

/**
 * Servicio para consumir la API REST de productos de Coffee Tec.
 * La URL base se toma de environment.apiUrl.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly url = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  /** GET /productos: obtiene todos los productos */
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
      .pipe(catchError(this.manejarError));
  }

  /** POST /productos: registra un producto nuevo */
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, producto)
      .pipe(catchError(this.manejarError));
  }

  /** PUT /productos/{id}: reemplaza un producto completo */
  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}`, producto)
      .pipe(catchError(this.manejarError));
  }

  /** PATCH /productos/{id}: actualiza solo algunos campos */
  actualizarParcial(id: number, cambios: Partial<Producto>): Observable<Producto> {
    return this.http.patch<Producto>(`${this.url}/${id}`, cambios)
      .pipe(catchError(this.manejarError));
  }

  /** DELETE /productos/{id}: elimina un producto */
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
      .pipe(catchError(this.manejarError));
  }

  /** Manejo centralizado de errores HTTP */
  private manejarError(error: HttpErrorResponse): Observable<never> {
    let mensaje: string;

    if (error.status === 0) {
      mensaje = 'No se pudo conectar con el servidor. Verifica que el backend esté activo o revisa CORS.';
    } else if (error.status === 400) {
      mensaje = 'Solicitud inválida. Revisa los datos enviados.';
    } else if (error.status === 404) {
      mensaje = 'Recurso no encontrado.';
    } else if (error.status >= 500) {
      mensaje = 'Error interno del servidor.';
    } else {
      mensaje = `Error ${error.status}: ${error.message}`;
    }

    console.error('Error en ProductoService:', error);
    return throwError(() => new Error(mensaje));
  }
}