import { IPlayer, Move } from '../models';

export class MichaelScottService implements IPlayer {
  name = 'Michael Scott';
  slogan = 'I got lots of paper.';
  description = 'Always plays paper.';

  shoot() {
    return Move.Paper;
  }
}
