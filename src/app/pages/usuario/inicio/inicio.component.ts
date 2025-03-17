import { Component, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';
import { ListaDeTareasComponent } from '../../../shared/components/lista-de-tareas/lista-de-tareas.component';
import { AgregarListaDeTareaComponent } from "../../../shared/components/agregar-lista-de-tarea/agregar-lista-de-tarea.component";

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
export class InicioComponent implements OnInit {

  listaTareas: ListaDeTareas[] = [];

  constructor(
    private listaDeTareasService: ListaDeTareasService,
  ) { }

  ngOnInit(): void {
    this.listaDeTareasService.ListarTodos().subscribe(
      (listaDeTareas) => {
        this.listaTareas = listaDeTareas;
      }
    )
  }


}
