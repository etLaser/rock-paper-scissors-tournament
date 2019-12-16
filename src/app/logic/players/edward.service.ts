import { Injectable } from '@angular/core';
import { IPlayer, Move } from '../models';

export class EdwardService implements IPlayer {  
  name = 'Edward Scissorhands';
  slogan = 'I don\'t really have a choice...';
  description = 'Always plays scissors.';

  shoot() {
    return Move.Scissors;
  }
}
