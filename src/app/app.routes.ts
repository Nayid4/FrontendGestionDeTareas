import { Routes } from '@angular/router';
import { PaginaNoEncontradaComponent } from './pages/extras/pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/usuario/usuario.routes').then(m => m.USUAIRIO_ROUTES)
    },
    {
        path: '**',
        component: PaginaNoEncontradaComponent 
    }
];
