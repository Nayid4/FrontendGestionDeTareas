import { ComandoTarea } from "./Tarea.model";

export interface CrearListaDeTareas {
    titulo: string;
  }
  
  export interface ActualizarListaDeTareas {
    id: string;
    titulo: string;
  }
  
  export interface FiltrarPorEstado {
    idListaDeTareas: string;
    estadoTarea: string;
  }
  
  export interface AgregarTarea {
    idListaDeTareas: string;
    tarea: ComandoTarea;
  }
  
  export interface EliminarTarea {
    idListaDeTareas: string;
    idTarea: string;
  }
  
  export interface ActualizarEstadoDeTarea {
    idListaDeTareas: string;
    idTarea: string;
    estado: string;
  }