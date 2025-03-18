import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas.model';
import { ListaDeTareasComponent } from '../../../shared/components/lista-de-tareas/lista-de-tareas.component';
import { AgregarListaDeTareaComponent } from "../../../shared/components/agregar-lista-de-tarea/agregar-lista-de-tarea.component";
import { Subject, takeUntil } from 'rxjs';
import { CrearListaDeTareas } from '../../../core/models/comandos.model';
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
        this.listaTareas = nuevaLista;
      }
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
  
  
}
