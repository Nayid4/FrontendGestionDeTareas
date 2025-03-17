import { Component, Input,  OnInit } from '@angular/core';
import { Tarea } from '../../../core/models/Tarea';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
export class TareaComponent implements OnInit {

  @Input() Tarea!: Tarea;
  @Input() IdListaDeTareas!: string;

  editar: boolean = false;
  formularioTarea!: FormGroup;

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
  ) { }

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

    console.log(this.formularioTarea.value.estadoTarea);

    //this.listaDeTareasService.ActualizarTarea(this.IdListaDeTareas, tareaActualizada).subscribe();
  }

  EliminarTarea(id: string) {
    this.listaDeTareasService.EliminarTarea(this.IdListaDeTareas, id).subscribe();
  }

  cambiarEstadoTarea() {
    this.formularioTarea.patchValue({
      estado: this.formularioTarea.value.estadoTarea ? 'Completada' : 'Pendiente'
    });

    console.log(this.formularioTarea.value.estado);

    console.log(this.formularioTarea.value.estadoTarea);

    this.listaDeTareasService.ActualizarEstadoDeTarea(this.IdListaDeTareas, this.Tarea.id, this.formularioTarea.value.estado).subscribe();
  }

  cancelarEdicion() {
    this.editar = false;
    this.inicializarFormulario();
  }
}