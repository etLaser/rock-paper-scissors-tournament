import { Injectable } from '@angular/core';
import { IPlayer, Match, Matchup, MatchupResults, Rules } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  rules: Rules;
  players = new Array<IPlayer>();

  constructor() { }

  setRules(rules: Rules) {
    this.rules = rules;
  }

  setPlayers(players: IPlayer[]) {
    this.players = players;
  }

  getPlayers(): IPlayer[] {
    return this.players;
  }

  performTournament(): Observable<MatchupResults> {
    return new Observable(subscriber => {
      const matchups = this.createTournamentList();
      const results = new Array<MatchupResults>();
      for (const matchup of matchups) {
        const result = this.performMatchup(matchup);
        results.push(result);
        subscriber.next(result);
      }
      subscriber.complete();
    });
  }

  createTournamentList(): Matchup[] {
    const matchups = new Array<Matchup>();
    let tournamentNumber = 0;
    const masturbate = this.rules.masturbate ? 0 : 1;
    for (let player1 = 0; player1 < this.players.length - masturbate; player1++) {
      for (let player2 = player1 + masturbate; player2 < this.players.length; player2++) {
        const player1Obj = Object.assign({}, this.players[player1]);
        const player2Obj = Object.assign({}, this.players[player2]);
        player1Obj.shoot = this.players[player1].shoot;
        player2Obj.shoot = this.players[player2].shoot;
        player1Obj.tournamentNumber = tournamentNumber++;
        player2Obj.tournamentNumber = tournamentNumber++;
        matchups.push({
          player1: player1Obj,
          player2: player2Obj
        } as Matchup);
      }
    }
    return matchups;
  }

  performMatchup(matchup: Matchup): MatchupResults {
    const results = new MatchupResults();
    let previousMatch: Match;

    for (let matchNumber = 0; matchNumber < this.rules.numberOfMatches; matchNumber++) {
      const currentMatch = this.performMatch(matchup, previousMatch);
      results.matches.push(currentMatch);
      const winner = this.determineWinner(currentMatch);
      if (!winner) {
        results.score.draws++;
      } else if (winner === currentMatch.play1.player) {
        results.score.player1Wins++;
      } else {
        results.score.player2Wins++;
      }
      previousMatch = currentMatch;
    }

    if (results.score.player1Wins > results.score.player2Wins) {
      results.winner = matchup.player1;
    } else if (results.score.player1Wins < results.score.player2Wins) {
      results.winner = matchup.player2;
    } else {
      results.winner = null;
    }

    return results;
  }

  performMatch(matchup: Matchup, previousMatch?: Match): Match {
    const match = new Match();

    match.play1.player = matchup.player1;
    match.play1.move = matchup.player1.shoot(previousMatch);

    match.play2.player = matchup.player2;
    match.play2.move = matchup.player2.shoot(previousMatch);

    return match;
  }

  determineWinner(match: Match): IPlayer | null {
    if (match.play1.move === match.play2.move) {
      return null;
    } else if ((match.play1.move - match.play2.move + 3) % 3 === 1) {
      return match.play1.player;
    } else {
      return match.play2.player;
    }
  }
}
