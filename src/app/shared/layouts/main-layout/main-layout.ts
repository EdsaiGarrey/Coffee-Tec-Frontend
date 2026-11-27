import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MENU } from '../../../core/config/menu';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private auth = inject(AuthService);
  private router = inject(Router);

  rol = this.auth.rol;
  menu = computed(() => MENU[this.rol()]);
  titulo = computed(() => ({
    admin: 'BIENVENIDO ADMINISTRADOR!',
    gerente: 'BIENVENIDO GERENTE!',
    empleado: 'BIENVENIDO!',
  }[this.rol()]));
  nombreRol = computed(() => ({
    admin: 'ADMINISTRADOR',
    gerente: 'GERENTE',
    empleado: 'EMPLEADO',
  }[this.rol()]));

  salir() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}