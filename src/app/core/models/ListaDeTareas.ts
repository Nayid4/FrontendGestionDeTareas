import { Tarea } from "./Tarea";

export interface ListaDeTareas {
    id: string,
    titulo: string,
    tareas: Tarea[]
}