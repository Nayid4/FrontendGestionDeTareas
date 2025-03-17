import { HttpInterceptorFn } from '@angular/common/http';

export const cargandoInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
