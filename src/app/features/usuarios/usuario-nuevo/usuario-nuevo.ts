import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.html',
  styleUrl: './usuario-nuevo.css',
})
export class UsuarioNuevo {
  private router = inject(Router);
  guardar() { this.router.navigate(['/usuarios']); }
}