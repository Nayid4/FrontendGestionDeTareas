import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ListaDeTareas } from '../models/ListaDeTareas.model';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { 
  CrearListaDeTareas, 
  ActualizarListaDeTareas, 
  FiltrarPorEstado, 
  AgregarTarea, 
  EliminarTarea, 
  ActualizarEstadoDeTarea 
} from '../models/comandos.model';

@Injectable({
  providedIn: 'root'
})
export class ListaDeTareasService {

  private api: string = environment.apiUrlBase;
  private endpoint: string = 'lista-de-tareas';

  private listaDeTareasSubject = new BehaviorSubject<ListaDeTareas[]>([]);
  listaDeTareas$ = this.listaDeTareasSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarLista();
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

  Crear(data: CrearListaDeTareas): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}`, data).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  Actualizar(data: ActualizarListaDeTareas): Observable<void> {
    return this.http.put<void>(`${this.api}/${this.endpoint}/${data.id}`, data).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  Eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${this.endpoint}/${id}`).pipe(
      tap(() => this.notifyUpdate())
    );
  }

  FiltrarPorEstado(data: FiltrarPorEstado): Observable<ListaDeTareas> {
    return this.http.post<ListaDeTareas>(`${this.api}/${this.endpoint}/filtrar-por-estado/${data.idListaDeTareas}`, data);
  }

  AgregarTarea(data: AgregarTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/agregar-tarea/${data.idListaDeTareas}`, data);
  }

  EliminarTarea(data: EliminarTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/eliminar-tarea/${data.idListaDeTareas}`, data);
  }

  ActualizarTarea(data: AgregarTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/actualizar-tarea/${data.idListaDeTareas}`, data);
  }

  ActualizarEstadoDeTarea(data: ActualizarEstadoDeTarea): Observable<void> {
    return this.http.post<void>(`${this.api}/${this.endpoint}/actualizar-estado-de-tarea/${data.idListaDeTareas}`, data);
  }
}