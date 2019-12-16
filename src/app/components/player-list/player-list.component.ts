import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPlayer } from '../../logic/models';

@Component({
  selector: 'rpst-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() players: IPlayer[];
  @Input() placement = 'right';
  @Output() playerClicked = new EventEmitter<IPlayer>();

  constructor() { }

  ngOnInit() {
  }
}
