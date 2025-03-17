import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas.model';
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
      next: (nuevaLista) => {
        if (this.listaTareas.length === 0) {
          // Si la lista está vacía, inicializa con los datos actuales
          this.listaTareas = nuevaLista;
        } else {
          const idsAnteriores = new Set(this.listaTareas.map(t => t.id));
          const idsNuevos = new Set(nuevaLista.map(t => t.id));
  
          if (nuevaLista.length > this.listaTareas.length) {
            // Buscar la tarea que no estaba antes (agregada)
            const nuevaTarea = nuevaLista.find(t => !idsAnteriores.has(t.id));
            if (nuevaTarea) {
              this.listaTareas = [...this.listaTareas, nuevaTarea];
            }
          } else if (nuevaLista.length < this.listaTareas.length) {
            // Se eliminó una tarea, mantener solo las que siguen en la nueva lista
            this.listaTareas = this.listaTareas.filter(t => idsNuevos.has(t.id));
          }
        }
      }
    });
  }
  
  
  
}
