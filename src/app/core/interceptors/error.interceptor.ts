import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertaService } from '../services/alerta.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ProblemDetails } from '../models/problemDetails.model';
import { EMPTY } from 'rxjs/internal/observable/empty';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertaServicio = inject(AlertaService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      

      // Manejo de otros errores con ProblemDetails
      if (error.error && error.error.title) {
        const problemDetails: ProblemDetails = error.error;
        const errorMessages = [];

        // Iterar sobre el mapa de errores si está disponible
        if (problemDetails.errors) {
          for (const [key, messages] of Object.entries(problemDetails.errors)) {
            errorMessages.push(`${messages.join(', ')}`);
          }
        } else {
          // Usar el título si no hay errores específicos
          errorMessages.push(problemDetails.title);
        }

        // Mostrar los errores en el servicio de mensajes
        alertaServicio.mostrarAlerta('error', errorMessages.join('\n'))
      } else {
        // Manejo genérico para errores no estándar
        const errorMessage = error.status === 0
          ? 'Error de conexión con el servidor.'
          : `Error ${error.status}: ${error.message}`;
        
          alertaServicio.mostrarAlerta('error', errorMessage)
        
      }

      return EMPTY; // Finalizar la cadena sin errores
    })
  );
};
