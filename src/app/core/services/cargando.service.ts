import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {

  cargando = signal<boolean>(false);

  constructor() { }
}
