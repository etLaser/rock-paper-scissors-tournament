import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { BartService } from './logic/players/bart.service';
import { CelineService } from './logic/players/celine.service';
import { EdwardService } from './logic/players/edward.service';
import { JabberwockyService } from './logic/players/jabberwocky.service';
import { MichaelScottService } from './logic/players/michael-scott.service';
import { SetupComponent } from './pages/setup/setup.component';
import { TournamentComponent } from './pages/tournament/tournament.component';
import { TooltipDirective } from './util/tooltip.directive';


@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    TooltipDirective,
    PlayerListComponent,
    TournamentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: 'players', useClass: BartService, multi: true },
    { provide: 'players', useClass: JabberwockyService, multi: true },
    { provide: 'players', useClass: CelineService, multi: true },
    { provide: 'players', useClass: MichaelScottService, multi: true },
    { provide: 'players', useClass: EdwardService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
