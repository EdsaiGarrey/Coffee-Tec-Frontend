import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.css',
})
export class ConfirmModal {
  mensaje = input('¿Desea continuar?');
  si = output<void>();
  no = output<void>();
}