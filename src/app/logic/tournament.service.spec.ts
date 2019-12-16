import { TestBed } from '@angular/core/testing';
import { IPlayer, Match, Matchup, Play, Rules } from './models';
import { BartService } from './players/bart.service';
import { EdwardService } from './players/edward.service';
import { MichaelScottService } from './players/michael-scott.service';
import { TournamentService } from './tournament.service';

const testRules: Rules = {
  numberOfMatches: 100
}

const testPlayers: IPlayer[] = [
  new BartService(),
  new MichaelScottService(),
  new EdwardService()
];

const expectedMatchups: Matchup[] = [
  { player1: testPlayers[0], player2: testPlayers[1] } as Matchup,
  { player1: testPlayers[0], player2: testPlayers[2] } as Matchup,
  { player1: testPlayers[1], player2: testPlayers[2] } as Matchup,
];

const matches: Match[] = [
  {
    play1: {
      player: expectedMatchups[0].player1,
      move: expectedMatchups[0].player1.shoot(null)
    } as Play,
    play2: {
      player: expectedMatchups[0].player2,
      move: expectedMatchups[0].player2.shoot(null)
    } as Play
  } as Match, {
    play1: {
      player: expectedMatchups[1].player1,
      move: expectedMatchups[1].player1.shoot(null)
    } as Play,
    play2: {
      player: expectedMatchups[1].player2,
      move: expectedMatchups[1].player2.shoot(null)
    } as Play
  } as Match, {
    play1: {
      player: expectedMatchups[2].player1,
      move: expectedMatchups[2].player1.shoot(null)
    } as Play,
    play2: {
      player: expectedMatchups[2].player2,
      move: expectedMatchups[2].player2.shoot(null)
    } as Play
  } as Match
];

const tieMatchup: Matchup = {
  player1: testPlayers[0], player2: testPlayers[0]
} as Matchup;

const tieMatch: Match = {
  play1: {
    player: testPlayers[0],
    move: testPlayers[0].shoot(null)
  } as Play,
  play2: {
    player: testPlayers[0],
    move: testPlayers[0].shoot(null)
  } as Play
}

describe('TournamentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    expect(service).toBeTruthy();
  });

  it('should be able to set players', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    service.setPlayers(testPlayers);
    expect(service.getPlayers()).toEqual(testPlayers);
  });

  it('should be able to create list of players for tournament', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    service.setPlayers(testPlayers);
    const list = service.createTournamentList();
    expect(list).toEqual(expectedMatchups);
  });

  it('should be able to perform a match in a matchup', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    const matchResults = service.performMatch(expectedMatchups[0], null);

    expect(matchResults.play1.player).toEqual(matches[0].play1.player);
    expect(matchResults.play1.move).toEqual(matches[0].play1.move);
    expect(matchResults.play2.player).toEqual(matches[0].play2.player);
    expect(matchResults.play2.move).toEqual(matches[0].play2.move);
  });

  it('should be able to determine winner of match', () => {
    const service: TournamentService = TestBed.get(TournamentService);

    const winner1 = service.determineWinner(matches[0]);
    const winner2 = service.determineWinner(matches[1]);
    const winner3 = service.determineWinner(matches[2]);
    const winner4 = service.determineWinner(tieMatch);

    expect(winner1).toBe(testPlayers[1]);
    expect(winner2).toBe(testPlayers[0]);
    expect(winner3).toBe(testPlayers[2]);
    expect(winner4).toBe(null);
  });

  it('should be able to perform matchup and return results', () => {
    const service: TournamentService = TestBed.get(TournamentService);
    service.setRules(testRules);

    const matchup1Results = service.performMatchup(expectedMatchups[0]);
    const matchup2Results = service.performMatchup(expectedMatchups[1]);
    const matchup3Results = service.performMatchup(expectedMatchups[2]);
    const matchup4Results = service.performMatchup(tieMatchup);

    expect(matchup1Results.matches.length).toBe(100);
    expect(matchup1Results.score.player2Wins).toBe(100);

    expect(matchup1Results.winner).toBe(testPlayers[1]);
    expect(matchup2Results.winner).toBe(testPlayers[0]);
    expect(matchup3Results.winner).toBe(testPlayers[2]);

    expect(matchup4Results.score.draws).toBe(100);
    expect(matchup4Results.winner).toBe(null);

  });
});
