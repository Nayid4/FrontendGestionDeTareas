import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { AlertaService } from '../../../core/services/alerta.service';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { CerrarIconoComponent } from "../../icons/cerrar-icono/cerrar-icono.component";
import { CrearListaDeTareas } from '../../../core/models/comandos.model';

@Component({
    selector: 'app-agregar-lista-de-tarea',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CerrarIconoComponent
],
    templateUrl: './agregar-lista-de-tarea.component.html',
    styleUrl: './agregar-lista-de-tarea.component.css'
})
export class AgregarListaDeTareaComponent  implements OnInit {
  @Output() listaCreada = new EventEmitter<CrearListaDeTareas>();
  agregar: boolean = false;
  formularioAgregarListaDeTareas!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    private formularioUtilServicio: FormularioUtilService
  ) { }

  ngOnInit(): void {
    this.incializarFormulario();
  }

  incializarFormulario(){
    this.formularioAgregarListaDeTareas = this.fb.group({
      titulo: ['', [Validators.required]],
    });
  }

  MostraroOcultarFormulario(){
    this.agregar = !this.agregar;
    this.incializarFormulario();
  }

  AgregarListaDeTareas() {
    if (this.formularioAgregarListaDeTareas.invalid) {
      this.formularioUtilServicio.verificarFormulario(this.formularioAgregarListaDeTareas);
      return;
    }

    const comando: CrearListaDeTareas = {
      titulo: this.formularioAgregarListaDeTareas.get('titulo')?.value
    };

    this.listaCreada.emit(comando);
    this.incializarFormulario();
    this.agregar = false;
  }

  tituloInvalido(): boolean {
    const titulo = this.formularioAgregarListaDeTareas.get('titulo');
    return !!titulo && titulo.invalid && titulo.touched;
  }
  

  
}