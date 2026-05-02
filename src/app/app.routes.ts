import { Routes } from '@angular/router';
import { ArtistsComponent } from './pages/artists/artists';
import { EquipmentComponent } from './pages/equipment/equipment';
import { StagesComponent } from './pages/stages/stages';
import { LineupComponent } from './pages/lineup/lineup';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: 'artists', component: ArtistsComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'stages', component: StagesComponent },
  { path: 'lineup', component: LineupComponent },
  { path: '', redirectTo: '/artists', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }  // ← SIEMPRE al final
];