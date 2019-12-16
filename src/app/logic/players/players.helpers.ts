import { Move } from '../models';

export function RandomMove() {
  const totalMoves = Object.keys(Move).length / 2;
  return Math.floor(Math.random() * totalMoves) as Move;
}

export function BeatingMove(move: Move) {
  switch (move) {
    case Move.Rock:
      return Move.Paper;

    case Move.Paper:
      return Move.Scissors;

    case Move.Scissors:
      return Move.Rock;
  }
}