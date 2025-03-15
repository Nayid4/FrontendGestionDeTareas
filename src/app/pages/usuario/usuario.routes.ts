import { Routes } from "@angular/router";
import { UsuarioLayoutComponent } from "./usuario-layout/usuario-layout.component";
import { InicioComponent } from "./inicio/inicio.component";

export const USUAIRIO_ROUTES: Routes = [
    { 
        path: '', 
        component: UsuarioLayoutComponent,
        children: [
            { path: '', component: InicioComponent },
        ]
    },
]