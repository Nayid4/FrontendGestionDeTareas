import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class FormularioUtilService {

  constructor(private alertaServicio: AlertaService) { }

  verificarFormulario(formulario: FormGroup): void {
    this.markFieldsAsTouched(formulario);
    this.showErrorMessage(formulario);
  }

  markFieldsAsTouched(formulario: FormGroup) {
    Object.keys(formulario.controls).forEach(field => {
      const control = formulario.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  showErrorMessage(formulario: FormGroup) {
    let message = 'Por favor, complete los siguientes campos: ';
    const invalidFields: string[] = [];
    
    Object.keys(formulario.controls).forEach(field => {
      const control = formulario.get(field);
      if (control && control.invalid) {
        invalidFields.push(field);
      }
    });

    if (invalidFields.length) {
      message += invalidFields.join(', ');
    }

    this.alertaServicio.mostrarAlerta('error', message);
  }
}