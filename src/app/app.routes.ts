import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  
  // Rutas protegidas
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard] 
  },
  { 
    path: 'artistas', 
    component: Dashboard, // El Rol 5 cambiará esto por su propio componente
    canActivate: [authGuard] 
  },
  { 
    path: 'escenarios', 
    component: Dashboard, // El Rol 5 cambiará esto por su propio componente
    canActivate: [authGuard] 
  },
  { 
    path: 'equipos', 
    component: Dashboard, // El Rol 5 cambiará esto por su propio componente
    canActivate: [authGuard] 
  },

  // Comodín para rutas no encontradas
  { path: '**', redirectTo: 'login' }
];