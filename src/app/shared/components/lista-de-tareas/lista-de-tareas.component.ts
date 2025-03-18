import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas.model';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { TareaComponent } from '../tarea/tarea.component';
import { AgregarTareaComponent } from "../agregar-tarea/agregar-tarea.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormularioUtilService } from '../../../core/services/formulario-util.service';
import { AlertaService } from '../../../core/services/alerta.service';
import { FiltroIconoComponent } from "../../icons/filtro-icono/filtro-icono.component";
import { EditarIconoComponent } from "../../icons/editar-icono/editar-icono.component";
import { EliminarIconoComponent } from "../../icons/eliminar-icono/eliminar-icono.component";
import { CerrarIconoComponent } from "../../icons/cerrar-icono/cerrar-icono.component";
import { ValidarIconoComponent } from "../../icons/validar-icono/validar-icono.component";
import { ActualizarEstadoDeTarea, ActualizarListaDeTareas, AgregarTarea, EliminarTarea, FiltrarPorEstado } from '../../../core/models/comandos.model';
import { ComandoTarea, Tarea } from '../../../core/models/Tarea.model';

@Component({
    selector: 'app-lista-de-tareas',
    standalone: true,
    imports: [
    TareaComponent,
    AgregarTareaComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FiltroIconoComponent,
    EditarIconoComponent,
    EliminarIconoComponent,
    CerrarIconoComponent,
    ValidarIconoComponent
],
    templateUrl: './lista-de-tareas.component.html',
    styleUrl: './lista-de-tareas.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaDeTareasComponent implements OnInit, OnDestroy, OnChanges {
  @Input() ListaDeTareas!: ListaDeTareas;
  @Output() listaEliminada = new EventEmitter<string>();
  @Output() listaActualizada = new EventEmitter<FiltrarPorEstado>();
  formularioListaDeTareas!: FormGroup;
  editar = false;
  filtro = 'Todas';
  listaTareas!: ListaDeTareas;
  listaDeFiltros = ['Todas', 'Completada', 'Pendiente'];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private alertaServicio: AlertaService,
    private formularioUtilServicio: FormularioUtilService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ListaDeTareas'] && !changes['ListaDeTareas'].firstChange) {
      const anterior = changes['ListaDeTareas'].previousValue;
      const actual = changes['ListaDeTareas'].currentValue;
  
      // Solo actualiza si el valor realmente cambió
      if (JSON.stringify(anterior) !== JSON.stringify(actual)) {
        this.listaTareas = { ...actual };
        this.cdRef.markForCheck();
        console.log("El componente ListaDeTareas ha cambiado: ", this.listaTareas.titulo);
        this.ajustarLista(this.filtro);
        console.log("Estado actual de la lista de tareas: ", this.filtro);
      }else{
        console.log("El componente ListaDeTareas no ha cambiado");
      }
    }
  }
  

  ngOnInit(): void {
    this.listaTareas = { ...this.ListaDeTareas };
    this.inicializarFormulario();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  inicializarFormulario(): void {
    this.formularioListaDeTareas = this.fb.group({
      id: [this.listaTareas.id],
      titulo: [this.listaTareas.titulo, [Validators.required]]
    });
  }

  eliminarListaDeTareas(): void {
    this.listaEliminada.emit(this.listaTareas.id);
  }

  editarListaDeTareas(): void {
    if (this.formularioListaDeTareas.invalid) {
      this.formularioUtilServicio.verificarFormulario(this.formularioListaDeTareas);
      return;
    }
    const comando: ActualizarListaDeTareas = this.formularioListaDeTareas.value;

    this.listaDeTareasService.Actualizar(comando).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.editar = false;
      this.listaTareas.titulo = comando.titulo;
      this.cdRef.markForCheck();
      this.alertaServicio.mostrarAlerta('exito', 'Lista de tareas actualizada correctamente.');
    });
  }

  ajustarLista(estado?: string): void {
    const comando: FiltrarPorEstado = { idListaDeTareas: this.listaTareas.id, estadoTarea: estado ?? 'Todas' };

    this.listaActualizada.emit(comando);
  }

  filtrarTareas(evento: Event) {
    const estado = (evento.target as HTMLButtonElement).value;

    if (estado === null) return;

    this.ajustarLista(estado);
    this.filtro = estado!;
  }

  mostraroOcultarFormulario() {
    this.editar = !this.editar;
  }

  cancelarEdicion() {
    this.editar = false;
    this.inicializarFormulario();
  }

  actualizarTarea(tareaActualizada: Tarea): void {
    const comando: AgregarTarea = { idListaDeTareas: this.listaTareas.id, tarea: tareaActualizada };
    this.listaDeTareasService.ActualizarTarea(comando).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.alertaServicio.mostrarAlerta('exito', 'Tarea actualizada correctamente.');
      this.ajustarLista(this.filtro);
    });
  }

  eliminarTarea(idTarea: string): void {
    const comando: EliminarTarea = { idListaDeTareas: this.listaTareas.id, idTarea };
    this.listaDeTareasService.EliminarTarea(comando).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.alertaServicio.mostrarAlerta('exito', 'Tarea eliminada correctamente.');
      this.ajustarLista(this.filtro);
    });
  }

  cambiarEstadoTarea(id: string, estado: string): void {
    const comando: ActualizarEstadoDeTarea = { idListaDeTareas: this.listaTareas.id, idTarea: id, estado };
    this.listaDeTareasService.ActualizarEstadoDeTarea(comando).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.alertaServicio.mostrarAlerta('exito', 'Estado de tarea actualizado correctamente.');
      this.ajustarLista(this.filtro);
    });
  }

  agregarTareaAListaDeTareas(tarea: ComandoTarea): void {
    const comandoTarea: AgregarTarea = { idListaDeTareas: this.listaTareas.id, tarea };
    this.listaDeTareasService.AgregarTarea(comandoTarea).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.alertaServicio.mostrarAlerta('exito', 'Tarea creada correctamente.');
      this.ajustarLista(this.filtro);
    });
  }

  campoInvalido(nombreCampo: string): boolean {
    const campo = this.formularioListaDeTareas.get(nombreCampo);
    return !!campo && campo.invalid && campo.touched;
  }
}