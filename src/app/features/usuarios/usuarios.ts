import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Usuario {
  nombre: string;
  user: string;
  correo: string;
  rol: 'Administrador' | 'Gerente' | 'Empleado';
  fecha: string;
}

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  usuarios: Usuario[] = [
    {
      nombre: 'Alan López',
      user: '@alanl',
      correo: 'alan@coffeetec.com',
      rol: 'Administrador',
      fecha: '20/11/2026',
    },
    {
      nombre: 'María García',
      user: '@mgarcia',
      correo: 'maria@coffeetec.com',
      rol: 'Gerente',
      fecha: '18/11/2026',
    },
    {
      nombre: 'Carlos Ruiz',
      user: '@cruiz',
      correo: 'carlos@coffeetec.com',
      rol: 'Empleado',
      fecha: '15/11/2026',
    },
  ];
}