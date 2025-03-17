import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { ComandoTarea } from '../../../core/models/Tarea';

@Component({
    selector: 'app-agregar-tarea',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './agregar-tarea.component.html',
    styleUrl: './agregar-tarea.component.css'
})
export class AgregarTareaComponent implements OnInit ,OnDestroy {
  @Input() IdListaDeTareas!: string;

  agregar: boolean = false;
  formularioAgregarTarea!: FormGroup;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
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
      return;
    }

    const tarea: ComandoTarea = {
      titulo: this.formularioAgregarTarea.get('titulo')?.value,
      descripcion: this.formularioAgregarTarea.get('descripcion')?.value,
      estado: this.formularioAgregarTarea.get('estado')?.value
    }

    this.listaDeTareasService.AgregarTarea(this.IdListaDeTareas, tarea).subscribe({
      next: () => {
        this.formularioAgregarTarea.reset();
      }
    })
  }

}
