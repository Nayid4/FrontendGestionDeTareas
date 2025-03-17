import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { AlertaService } from '../../../core/services/alerta.service';

@Component({
    selector: 'app-agregar-lista-de-tarea',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './agregar-lista-de-tarea.component.html',
    styleUrl: './agregar-lista-de-tarea.component.css'
})
export class AgregarListaDeTareaComponent  implements OnInit, OnDestroy {
   
  agregar: boolean = false;
  formularioAgregarListaDeTareas!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
    private alertaServicio: AlertaService
  ) { }

  ngOnInit(): void {
    this.incializarFormulario();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  incializarFormulario(){
    this.formularioAgregarListaDeTareas = this.fb.group({
      titulo: ['', [Validators.required]],
    });
  }

  MostraroOcultarFormulario(){
    this.agregar = !this.agregar;
  }

  AgregarListaDeTareas() {
    if(this.formularioAgregarListaDeTareas.invalid){
      this.alertaServicio.mostrarAlerta('error','El campo titulo es requerido.');
      return;
    }


    this.listaDeTareasService.Crear(this.formularioAgregarListaDeTareas.get('titulo')?.value)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.incializarFormulario();
        this.agregar = false;
        this.alertaServicio.mostrarAlerta('exito','Lista de tareas creada correctamente.');
      }
    })
  }

}