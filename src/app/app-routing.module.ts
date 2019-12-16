import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './pages/setup/setup.component';
import { TournamentComponent } from './pages/tournament/tournament.component';


const routes: Routes = [
  {
    path: 'setup',
    component: SetupComponent
  },
  {
    path: 'tournament',
    component: TournamentComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'setup'
  },
  {
    path: '**',
    redirectTo: 'setup'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
