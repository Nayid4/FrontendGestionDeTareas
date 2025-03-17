import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';
import { ListaDeTareasComponent } from '../../../shared/components/lista-de-tareas/lista-de-tareas.component';
import { AgregarListaDeTareaComponent } from "../../../shared/components/agregar-lista-de-tarea/agregar-lista-de-tarea.component";
import { Subject } from 'rxjs';

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
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.listaDeTareasService.listaDeTareas$.subscribe({
      next: (listaTareas) => {
        this.listaTareas = listaTareas;
      }
    });
  }
}
