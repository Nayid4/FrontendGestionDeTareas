import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { ComandoTarea } from '../../../core/models/Tarea';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { AlertaService } from '../../../core/services/alerta.service';

@Component({
    selector: 'app-agregar-tarea',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './agregar-tarea.component.html',
    styleUrl: './agregar-tarea.component.css'
})
export class AgregarTareaComponent implements OnInit ,OnDestroy {
  @Input() IdListaDeTareas!: string;
  @Output() TareaAgregada = new EventEmitter<boolean>();

  agregar: boolean = false;
  formularioAgregarTarea!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
    private alertaServicio: AlertaService,
    private formularioUtilServicio: FormularioUtilService
  ) { }

  ngOnInit(): void {
    this.incializarFormulario();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  AgregarTarea() {
    if(this.formularioAgregarTarea.invalid){
      this.formularioUtilServicio.verificarFormulario(this.formularioAgregarTarea);
      return;
    }

    const tarea: ComandoTarea = {
      titulo: this.formularioAgregarTarea.get('titulo')?.value,
      descripcion: this.formularioAgregarTarea.get('descripcion')?.value,
      estado: this.formularioAgregarTarea.get('estado')?.value
    }

    this.listaDeTareasService.AgregarTarea(this.IdListaDeTareas, tarea)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.incializarFormulario();
        this.agregar = false;
        this.TareaAgregada.emit(true);
        this.alertaServicio.mostrarAlerta('exito','Tarea creada correctamente.');
      }
    })
  }

}
