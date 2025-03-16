import { Component, Input } from '@angular/core';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { TareaComponent } from '../tarea/tarea.component';
import { AgregarTareaComponent } from "../agregar-tarea/agregar-tarea.component";

@Component({
  selector: 'app-lista-de-tareas',
  standalone: true,
  imports: [
    TareaComponent,
    AgregarTareaComponent
],
  templateUrl: './lista-de-tareas.component.html',
  styleUrl: './lista-de-tareas.component.css'
})
export class ListaDeTareasComponent {
  @Input() ListaDeTareas!: ListaDeTareas;

  constructor(
    private listaDeTareasService: ListaDeTareasService
  ) { }

  
}
