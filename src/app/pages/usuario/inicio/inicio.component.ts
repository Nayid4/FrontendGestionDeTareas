import { Component, OnInit } from '@angular/core';
import { ListaDeTareasService } from '../../../core/services/lista-de-tareas.service';
import { ListaDeTareas } from '../../../core/models/ListaDeTareas';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
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
