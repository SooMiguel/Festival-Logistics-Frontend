import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

// Importamos las clases exactamente con el nombre que generó tu compañero
import { Artistas } from './pages/artistas/artistas';
import { Escenarios } from './pages/escenarios/escenarios';
import { Equipos } from './pages/equipos/equipos';
import { Presentaciones } from './pages/presentaciones/presentaciones';
import { Usuarios } from './pages/usuarios/usuarios';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'artistas', component: Artistas },
      { path: 'escenarios', component: Escenarios },
      { path: 'equipos', component: Equipos },
      { path: 'presentaciones', component: Presentaciones },
      { path: 'usuarios', component: Usuarios }
    ]
  },
  // Si alguien escribe una URL que no existe, lo mandamos al error 404
  { path: '**', component: NotFound }
];