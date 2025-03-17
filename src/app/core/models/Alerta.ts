export interface Alerta {
    mensaje: string;
    tipo: 'exito' | 'error' | 'advertencia' | 'info';
    id: number;
  }