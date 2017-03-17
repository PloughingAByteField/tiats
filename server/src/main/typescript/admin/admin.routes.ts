import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing';
import { ClubsComponent } from './clubs';
import { ConfigComponent } from './config';
import { DrawComponent } from './draw';
import { EntriesComponent } from './entries';
import { EventsComponent } from './events';
import { PositionsComponent } from './positions';
import { RacePositionsComponent } from './race-positions';
import { RacesComponent } from './races';
import { UsersComponent } from './users';
import { RacePositionTemplatesComponent } from './race-position-templates';
import { CreateEventComponent } from './events/create-event';

import { NoContentComponent } from '../components/no-content/no-content.component';

export const adminRoutes: Routes = [
  { path: '',      component: LandingComponent, pathMatch: 'full' },
  { path: 'clubs',      component: ClubsComponent },
  { path: 'config',      component: ConfigComponent },
  { path: 'draw',      component: DrawComponent },
  { path: 'entries',      component: EntriesComponent },
  { path: 'events',      component: EventsComponent, },
  { path: 'events/create', component: CreateEventComponent },
  { path: 'positions',      component: PositionsComponent },
  { path: 'race-positions',      component: RacePositionsComponent },
  { path: 'race-positions/:raceId',      component: RacePositionsComponent },
  { path: 'race-position-template/:templateId',      component: RacePositionTemplatesComponent },
  { path: 'races',      component: RacesComponent },
  { path: 'users',      component: UsersComponent },
  { path: '**',    component: NoContentComponent }
];
