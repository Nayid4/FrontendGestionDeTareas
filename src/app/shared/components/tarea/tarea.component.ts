import { Component, Input } from '@angular/core';
import { Tarea } from '../../../core/models/Tarea';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})
export class TareaComponent {
  @Input() Tarea!: Tarea;

  constructor(
    private listaDeTareasService: ListaDeTareasService
  ) { }


}
