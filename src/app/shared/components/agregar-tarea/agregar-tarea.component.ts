import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { ComandoTarea } from '../../../core/models/Tarea.model';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { CerrarIconoComponent } from "../../icons/cerrar-icono/cerrar-icono.component";
import { AgregarIconoComponent } from "../../icons/agregar-icono/agregar-icono.component";
import { AgregarTarea } from '../../../core/models/comandos.model';

@Component({
    selector: 'app-agregar-tarea',
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CerrarIconoComponent,
    AgregarIconoComponent
],
    templateUrl: './agregar-tarea.component.html',
    styleUrl: './agregar-tarea.component.css'
})
export class AgregarTareaComponent implements OnInit {
  @Output() tareaAgregada = new EventEmitter<ComandoTarea>();

  agregar: boolean = false;
  formularioAgregarTarea!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private formularioUtilServicio: FormularioUtilService
  ) { }

  ngOnInit(): void {
    this.incializarFormulario();
  }

  incializarFormulario(){
    this.formularioAgregarTarea = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['Pendiente', [Validators.required]] 
    });
  }

  MostraroOcultarFormulario(){
    this.agregar = !this.agregar;
  }

  AgregarTareaAListaDeTareas() {
    if(this.formularioAgregarTarea.invalid){
      this.formularioUtilServicio.verificarFormulario(this.formularioAgregarTarea);
      return;
    }

    const tarea: ComandoTarea = {
      titulo: this.formularioAgregarTarea.get('titulo')?.value,
      descripcion: this.formularioAgregarTarea.get('descripcion')?.value,
      estado: this.formularioAgregarTarea.get('estado')?.value
    }

    this.incializarFormulario();
    this.agregar = false;
    this.tareaAgregada.emit(tarea);
  }

  campoInvalido(nombreCampo: string): boolean {
    const titulo = this.formularioAgregarTarea.get(nombreCampo);
    return !!titulo && titulo.invalid && titulo.touched;
  }
}
