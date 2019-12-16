import { Injectable } from '@angular/core';
import { IPlayer, Move, Match } from '../models';
import { RandomMove, BeatingMove } from './players.helpers';

@Injectable()
export class CelineService implements IPlayer {
  name = 'Celine Dione';
  slogan = 'Coulda woulda shoulda, but I didn\'t do that.';
  description = 'Starts with a random hand, then plays the hand that would have beat their opponent last hand.';

  shoot(previousMatch: Match): Move {
    if (!previousMatch) {
      return RandomMove();
    } else {
      let opponentsMove: Move;
      if (previousMatch.play1.player === this) {
        opponentsMove = previousMatch.play2.move;
      } else {
        opponentsMove = previousMatch.play1.move;
      }

      return BeatingMove(opponentsMove);
    }
  }
}