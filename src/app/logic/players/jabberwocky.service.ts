import { Injectable } from '@angular/core';
import { IPlayer, Move } from '../models';
import { RandomMove } from './players.helpers';

@Injectable()
export class JabberwockyService implements IPlayer {
  name = "Jabberwocky";
  slogan = "The jaws that bite, the claws that catch!";
  description = "Always plays a random hand.";

  shoot() {
    return RandomMove();
  }
}