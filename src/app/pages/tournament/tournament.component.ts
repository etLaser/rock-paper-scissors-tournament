import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TournamentService } from 'src/app/logic/tournament.service';
import { MatchupResults, IPlayer } from 'src/app/logic/models';
import { Router } from '@angular/router';

@Component({
  selector: 'rpst-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  results = new Array<MatchupResults>();
  players = new Array<IPlayer>();
  playerWins = new Array<{player: IPlayer, wins: number}>();
  totalPlayers: number;
  totalMatches: number;
  showResults = false;

  constructor(
    private service: TournamentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.players = this.service.getPlayers();
    this.totalPlayers = this.players.length;

    if (this.totalPlayers === 0) {
      this.router.navigate(['setup']);
      return;
    }

    this.totalMatches = (this.totalPlayers * (this.totalPlayers - 1)) / 2;
    this.performTournament();
  }

  again() {
    this.performTournament();
  }

  performTournament() {
    this.results = new Array<MatchupResults>();
    this.playerWins = new Array<{player: IPlayer, wins: number}>();

    this.service.performTournament().subscribe(result => {
      this.results.push(result);
    }, () => {}, () => {
      this.showResults = true;
      for (const player of this.players) {
        const wins = this.results.filter(r => (r.winner != null && r.winner.name === player.name)).length || 0;
        this.playerWins.push({player, wins});
      }
      this.playerWins.sort((a, b) => b.wins - a.wins);
    });
  }
}
