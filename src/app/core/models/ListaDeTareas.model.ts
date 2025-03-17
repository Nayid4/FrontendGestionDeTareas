import { Tarea } from "./Tarea.model";

export interface ListaDeTareas {
    id: string,
    titulo: string,
    tareas: Tarea[]
}