import { Component, EventEmitter, Input,  OnDestroy,  OnInit, Output } from '@angular/core';
import { Tarea } from '../../../core/models/Tarea';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-tarea',
    standalone: true,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule
    ],
    templateUrl: './tarea.component.html',
    styleUrl: './tarea.component.css'
})
export class TareaComponent implements OnInit, OnDestroy {
  @Input() Tarea!: Tarea;
  @Input() IdListaDeTareas!: string;
  @Output() TareaAjustada = new EventEmitter<boolean>();

  editar: boolean = false;
  formularioTarea!: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
  ) {
    this.TareaAjustada = new EventEmitter<boolean>();
   }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formularioTarea = this.fb.group({
      id: [this.Tarea.id],
      titulo: [this.Tarea.titulo, [Validators.required]],
      descripcion: [this.Tarea.descripcion, [Validators.required]],
      estado: [this.Tarea.estado],
      estadoTarea: [this.Tarea.estado === 'Completada' ? true : false],
    });
  }

  EditarTarea() {
    if(this.formularioTarea.invalid){
      return;
    }
    this.guardarCambios();
  }

  guardarCambios() {
    const tareaActualizada: Tarea = {
      ...this.Tarea,
      ...this.formularioTarea.value,
      estado: this.formularioTarea.value.estadoTarea ? 'Completada' : 'Pendiente'
    };

    this.listaDeTareasService.ActualizarTarea(this.IdListaDeTareas, tareaActualizada)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.editar = false;
        this.TareaAjustada.emit(true);
      }
    });
  }

  EliminarTarea(id: string) {
    this.listaDeTareasService.EliminarTarea(this.IdListaDeTareas, id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.TareaAjustada.emit(true);
      }
    });
  }

  cambiarEstadoTarea() {
    this.formularioTarea.patchValue({
      estado: this.formularioTarea.value.estadoTarea  ? 'Pendiente' : 'Completada'
    });

    this.listaDeTareasService.ActualizarEstadoDeTarea(this.IdListaDeTareas, this.Tarea.id, this.formularioTarea.value.estado)
    .pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        this.TareaAjustada.emit(true);
      }
    });
  }

  MostraroOcultarFormulario() {
    this.editar = !this.editar;
  }

  cancelarEdicion() {
    this.editar = false;
    this.inicializarFormulario();
  }
}