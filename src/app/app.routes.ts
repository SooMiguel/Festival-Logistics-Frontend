import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

// Importaciones de Rol 4

import { Usuarios } from './pages/usuarios/usuarios';
import { NotFoundComponent } from './pages/not-found/not-found';

// Importaciones de Rol 5 (tú)
import { ArtistsComponent } from './pages/artistas/artistas';
import { EquipmentComponent } from './pages/equipos/equipos';
import { StagesComponent } from './pages/escenarios/escenarios';
import { LineupComponent } from './pages/presentaciones/presentaciones';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      // Rutas de Rol 4
      { path: 'dashboard', component: Dashboard },
    
      { path: 'usuarios', component: Usuarios },
      
      // Rutas de Rol 5 (tus vistas)
      { path: 'artistas', component: ArtistsComponent },
      { path: 'equipos', component: EquipmentComponent },
      { path: 'escenarios', component: StagesComponent },
      { path: 'presentaciones', component: LineupComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];