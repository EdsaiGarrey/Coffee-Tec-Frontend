import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-nueva',
  templateUrl: './categoria-nueva.html',
  styleUrl: './categoria-nueva.css',
})
export class CategoriaNueva {
  private router = inject(Router);
  guardar() { this.router.navigate(['/categorias']); }
}