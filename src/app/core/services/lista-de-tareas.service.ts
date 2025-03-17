import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ListaDeTareas } from '../models/ListaDeTareas';
import { ComandoTarea } from '../models/Tarea';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaDeTareasService {

  private api: string = environment.apiUrlBase;
  private endpoint: string = 'lista-de-tareas';

  // BehaviorSubject para gestionar la lista de tareas
  private listaDeTareasSubject = new BehaviorSubject<ListaDeTareas[]>([]);
  listaDeTareas$ = this.listaDeTareasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarLista(); // Cargar las listas al iniciar el servicio
  }

  private cargarLista() {
    this.http.get<ListaDeTareas[]>(`${this.api}/${this.endpoint}`).subscribe(lista => {
      this.listaDeTareasSubject.next(lista);
    });
  }

  notifyUpdate() {
    this.cargarLista();
  }

  ListarTodos(): Observable<ListaDeTareas[]> {
    return this.listaDeTareas$;
  }

  Crear(titulo: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}`, { titulo }).pipe(
      tap(() => this.notifyUpdate()) // Actualizar la lista después de la creación
    );
  }

  Actualizar(id: string, titulo: string): Observable<void> {
    return this.http.put<void>(`${this.api}/${this.endpoint}/${id}`, { id, titulo }).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  Eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  FiltrarPorEstado(idListaDeTareas: string, estadoTarea: string): Observable<ListaDeTareas> {
    return this.http.post<ListaDeTareas>(`${this.api}/${this.endpoint}/filtrar-por-estado/${idListaDeTareas}`, { idListaDeTareas: idListaDeTareas, estadoTarea: estadoTarea });
  }

  AgregarTarea(idListaDeTareas: string, tarea: ComandoTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/agregar-tarea/${idListaDeTareas}`, { idListaDeTareas: idListaDeTareas, tarea }).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  EliminarTarea(idListaDeTareas: string, idTarea: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/eliminar-tarea/${idListaDeTareas}`, { idListaDeTareas: idListaDeTareas, idTarea: idTarea }).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  ActualizarTarea(idListaDeTareas: string, tarea: ComandoTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/actualizar-tarea/${idListaDeTareas}`, { idListaDeTareas: idListaDeTareas, tarea }).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  ActualizarEstadoDeTarea(idListaDeTareas: string, idTarea: string, estadoTarea: string): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/actualizar-estado-de-tarea/${idListaDeTareas}`, { idListaDeTareas: idListaDeTareas, idTarea: idTarea, estado: estadoTarea })
  }
}
