import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { TareaComponent } from '../tarea/tarea.component';
import { AgregarTareaComponent } from "../agregar-tarea/agregar-tarea.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { AlertaService } from '../../../core/services/alerta.service';

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
  filtro: string = 'Todas';


  private unsubscribe$ = new Subject<void>();

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private alertaServicio: AlertaService,
    private formularioUtilServicio: FormularioUtilService
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
    this.listaDeTareasService.Eliminar(id).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        this.alertaServicio.mostrarAlerta('exito','Lista de tareas eliminada correctamente.');
      }
    });
  }

  EditarListaDeTareas() {
    if(this.formularioListaDeTareas.invalid){
      this.formularioUtilServicio.verificarFormulario(this.formularioListaDeTareas);
      return;
    }

    this.listaDeTareasService.Actualizar(this.formularioListaDeTareas.get('id')?.value, this.formularioListaDeTareas.get('titulo')?.value)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.editar = false;
        this.ListaDeTareas.titulo = this.formularioListaDeTareas.get('titulo')?.value;
        this.cdRef.detectChanges();
        this.alertaServicio.mostrarAlerta('exito','Lista de tareas actualizada correctamente.');
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

  AjusteDeLista(evento: boolean | undefined, estado?: string): void {
    
    if (evento === undefined) {
      return;
    }

    if (evento) {

      this.listaDeTareasService.FiltrarPorEstado(this.ListaDeTareas.id, estado ?? 'Todas')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (listaDeTareas) => {
          this.ListaDeTareas = listaDeTareas;
          this.cdRef.detectChanges();
        }
      });
    }
  }


  filtrarTareas(evento: Event) {
    const estado = (evento.target as HTMLButtonElement).value;

    if (estado === null) {
      return;
    }

    this.AjusteDeLista(true, estado);

    this.filtro = estado!;
  }
  
}
