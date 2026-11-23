import { Injectable, signal } from '@angular/core';
import { Rol } from '../config/menu';

@Injectable({ providedIn: 'root' })
export class AuthService {
  rol = signal<Rol>('admin');

  // Temporal: el rol depende del correo (hasta conectar el backend)
  login(email: string) {
    const e = email.toLowerCase();
    if (e.includes('gerente')) this.rol.set('gerente');
    else if (e.includes('empleado')) this.rol.set('empleado');
    else this.rol.set('admin');
  }

  logout() {}
}