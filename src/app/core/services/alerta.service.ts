import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alerta } from '../models/Alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private alertasSubject = new BehaviorSubject<Alerta[]>([]);
  alertas$ = this.alertasSubject.asObservable();
  private siguienteId = 0;

  mostrarAlerta(tipo: 'exito' | 'error' | 'advertencia' | 'info', mensaje: string,  duracion: number = 3000) {
    const id = this.siguienteId++;
    const nuevaAlerta: Alerta = { mensaje, tipo, id };
    const alertasActuales = this.alertasSubject.getValue();
    this.alertasSubject.next([...alertasActuales, nuevaAlerta]);

    setTimeout(() => {
      this.eliminarAlerta(id);
    }, duracion);
  }

  private eliminarAlerta(id: number) {
    const alertasActuales = this.alertasSubject.getValue();
    this.alertasSubject.next(alertasActuales.filter(alerta => alerta.id !== id));
  }
}
