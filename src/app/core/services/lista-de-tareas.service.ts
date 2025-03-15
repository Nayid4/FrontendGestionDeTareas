import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ListaDeTareas } from '../models/ListaDeTareas';
import { ComandoTarea } from '../models/Tarea';

@Injectable({
  providedIn: 'root'
})
export class ListaDeTareasService {

  private api: string = environment.apiUrlBase
  private endpoint: string = 'lista-de-tareas'

  constructor(private http: HttpClient) {
   }

  ListarTodos(): Observable<ListaDeTareas[]> {
    return this.http.get<ListaDeTareas[]>(`${this.api}/${this.endpoint}`);
  }


  Crear(titulo: string): Observable<void>{
    return this.http.post<void>(`${this.api}/${this.endpoint}`, {titulo: titulo});
  }

  Actualizar(id: string, titulo: string): Observable<void>{
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, {id: id, titulo: titulo});
  }

  Eliminar(id: string): Observable<void>{
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`);
  }

  FiltrarPorEstado(idListaDeTareas: string, estadoTarea: string): Observable<ListaDeTareas[]> {
    return this.http.post<ListaDeTareas[]>(`${this.api}/${this.endpoint}/filtrar-por-estado/${idListaDeTareas}`, {idListaDeTareas: idListaDeTareas, estado: estadoTarea});	
  }
  
  AgregarTarea(idListaDeTareas: string, tarea: ComandoTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/agregar-tarea/${idListaDeTareas}`, {idListaDeTareas: idListaDeTareas, tarea: tarea});	
  }

  EliminarTarea(idListaDeTareas: string, idTarea: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/eliminar-tarea/${idListaDeTareas}`, {idListaDeTareas: idListaDeTareas, idTarea: idTarea});	
  }

  ActualizarTarea(idListaDeTareas: string, tarea: ComandoTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/actualizar-tarea/${idListaDeTareas}`, {idListaDeTareas: idListaDeTareas, tarea: tarea});	
  }

  ActualizarEstadoDeTarea(idListaDeTareas: string, idTarea: string, estadoTarea: string): Observable<ListaDeTareas[]> {
    return this.http.post<ListaDeTareas[]>(`${this.api}/${this.endpoint}/actualizar-estado-de-tarea/${idListaDeTareas}`, {idListaDeTareas: idListaDeTareas, idTarea: idTarea, estado: estadoTarea});	
  }
}
