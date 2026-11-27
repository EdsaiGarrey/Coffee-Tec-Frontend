import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  usuarios = [
    { nombre: 'María Rodríguez', user: 'mrodriguez', correo: 'maria.rodriguez@altamora.com', rol: 'Administrador', fecha: '12/05/2025 08:30' },
    { nombre: 'Juan Pérez', user: 'jperez', correo: 'juan.perez@altamora.com', rol: 'Gerente', fecha: '10/05/2025 14:20' },
  ];
}