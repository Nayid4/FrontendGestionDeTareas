import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas.model';
import { ListaDeTareasComponent } from '../../../shared/components/lista-de-tareas/lista-de-tareas.component';
import { AgregarListaDeTareaComponent } from "../../../shared/components/agregar-lista-de-tarea/agregar-lista-de-tarea.component";
import { Subject, takeUntil } from 'rxjs';
import { ActualizarListaDeTareas, CrearListaDeTareas, FiltrarPorEstado } from '../../../core/models/comandos.model';
import { AlertaService } from '../../../core/services/alerta.service';

@Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [
        ListaDeTareasComponent,
        AgregarListaDeTareaComponent
    ],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {

  listaTareas: ListaDeTareas[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private listaDeTareasService: ListaDeTareasService,
    private alertaServicio: AlertaService,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.listaDeTareasService.listaDeTareas$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (nuevaLista) => {
          this.listaTareas = this.actualizarListasSinReasignar(nuevaLista);
        }
      });
  }
  
  private actualizarListasSinReasignar(nuevaLista: ListaDeTareas[]): ListaDeTareas[] {
    return nuevaLista.map(nueva => {
      const existente = this.listaTareas.find(lista => lista.id === nueva.id);
      return existente && JSON.stringify(existente) === JSON.stringify(nueva) ? existente : nueva;
    });
  }
  
  
  crearListaDeTareas(comando: CrearListaDeTareas) {
    this.listaDeTareasService.Crear(comando)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.alertaServicio.mostrarAlerta('exito', 'Lista de tareas creada correctamente.');
      }
    });
  }
  
  eliminarListaDeTareas(id: string) {
    this.listaDeTareasService.Eliminar(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: () => {
        this.listaTareas = this.listaTareas.filter((lista) => lista.id !== id);
        this.alertaServicio.mostrarAlerta('exito', 'Lista de tareas eliminada correctamente.');
      }
    });
  }
  
  editarListaDeTareas(comando: FiltrarPorEstado): void {
    this.listaDeTareasService.FiltrarPorEstado(comando)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((listaDeTareas) => {
        this.listaTareas = this.listaTareas.map((lista) =>
          lista.id === listaDeTareas.id ? { ...listaDeTareas } : lista
        );
      });
  }
  
  
}
