export enum Move {
  Paper,
  Scissors,
  Rock
}

export class Matchup {
  player1: IPlayer;
  player2: IPlayer;
}

export class Play {
  player: IPlayer;
  move: Move;
}

export class Match {
  play1: Play;
  play2: Play;

  constructor() {
    this.play1 = new Play();
    this.play2 = new Play();
  }
}

export class Score {
  player1Wins: number = 0;
  player2Wins: number = 0;
  draws: number = 0;
}

export class MatchupResults {
  winner: IPlayer;
  score: Score;
  matches: Match[];

  constructor() {
    this.score = new Score();
    this.matches = new Array<Match>();
  }
}

export class Rules {
  numberOfMatches: number;
  masturbate: boolean;
}

export interface IPlayer {
  name: string;
  slogan: string;
  description: string;
  tournamentNumber?: number;

  shoot(previousMatch?: Match): Move;
}