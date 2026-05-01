import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'artistas', component: Dashboard },
      { path: 'escenarios', component: Dashboard },
      { path: 'equipos', component: Dashboard },
      { path: 'presentaciones', component: Dashboard }
    ]
  },
  { path: '**', redirectTo: 'login' }
];