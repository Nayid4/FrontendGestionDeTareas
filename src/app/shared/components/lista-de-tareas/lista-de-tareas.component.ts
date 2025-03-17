import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { TareaComponent } from '../tarea/tarea.component';
import { AgregarTareaComponent } from "../agregar-tarea/agregar-tarea.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-lista-de-tareas',
    standalone: true,
    imports: [
        TareaComponent,
        AgregarTareaComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './lista-de-tareas.component.html',
    styleUrl: './lista-de-tareas.component.css'
})
export class ListaDeTareasComponent implements OnInit, OnDestroy {
  @Input() ListaDeTareas!: ListaDeTareas;
  formularioListaDeTareas!: FormGroup;
  editar: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formularioListaDeTareas = this.fb.group({
      id: [this.ListaDeTareas.id],
      titulo: [this.ListaDeTareas.titulo, [Validators.required]]
    });
  }

  EliminarListaDeTareas(id: string): void {
    this.listaDeTareasService.Eliminar(id).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  EditarListaDeTareas() {
    if(this.formularioListaDeTareas.invalid){
      return;
    }

    this.listaDeTareasService.Actualizar(this.formularioListaDeTareas.get('id')?.value, this.formularioListaDeTareas.get('titulo')?.value)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.editar = false;
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
