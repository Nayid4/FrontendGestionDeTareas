import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Tarea } from '../../../core/models/Tarea.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { EditarIconoComponent } from "../../icons/editar-icono/editar-icono.component";
import { EliminarIconoComponent } from "../../icons/eliminar-icono/eliminar-icono.component";
import { CerrarIconoComponent } from "../../icons/cerrar-icono/cerrar-icono.component";
import { ValidarIconoComponent } from "../../icons/validar-icono/validar-icono.component";

@Component({
    selector: 'app-tarea',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        EditarIconoComponent,
        EliminarIconoComponent,
        CerrarIconoComponent,
        ValidarIconoComponent
    ],
    templateUrl: './tarea.component.html',
    styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit, OnDestroy {
  @Input() tarea!: Tarea;
  @Input() idListaDeTareas!: string;
  @Output() tareaActualizada = new EventEmitter<Tarea>();
  @Output() tareaEliminada = new EventEmitter<string>();
  @Output() estadoCambiado = new EventEmitter<string>();

  editar: boolean = false;
  formularioTarea!: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formularioTarea = this.fb.group({
      id: [this.tarea.id],
      titulo: [this.tarea.titulo, [Validators.required]],
      descripcion: [this.tarea.descripcion, [Validators.required]],
      estado: [this.tarea.estado],
      estadoTarea: [this.tarea.estado === 'Completada']
    });
  }

  editarTarea() {
    if (this.formularioTarea.invalid) return;
    this.guardarCambios();
  }

  guardarCambios() {
    const tareaActualizada: Tarea = {
      ...this.tarea,
      ...this.formularioTarea.value,
      estado: this.formularioTarea.value.estadoTarea ? 'Completada' : 'Pendiente'
    };
    this.tareaActualizada.emit(tareaActualizada);
    this.editar = false;
  }

  eliminarTarea() {
    this.tareaEliminada.emit(this.tarea.id);
  }

  cambiarEstadoTarea() {
    const nuevoEstado = this.formularioTarea.value.estadoTarea ? 'Pendiente' : 'Completada';
    this.estadoCambiado.emit(nuevoEstado);
  }

  mostrarOcultarFormulario() {
    this.editar = !this.editar;
  }

  cancelarEdicion() {
    this.editar = false;
    this.inicializarFormulario();
  }
}
