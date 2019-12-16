import { Injectable } from '@angular/core';
import { IPlayer, Move } from '../models';

@Injectable()
export class BartService implements IPlayer {
  name = 'Bart Simpson';
  slogan = 'Good ol\' rock. Nothing beats that.';
  description = 'Always plays rock.';

  shoot() {
    return Move.Rock;
  }
}