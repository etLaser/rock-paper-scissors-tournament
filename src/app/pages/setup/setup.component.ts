import { Component, OnInit, Inject } from '@angular/core';
import { IPlayer, Rules } from '../../logic/models';
import { TournamentService } from 'src/app/logic/tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rpst-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  roster = new Array<IPlayer>();

  constructor(
    @Inject('players') public players: IPlayer[],
    private service: TournamentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sortLists();
    this.service.setRules({
      numberOfMatches: 1000000,
      masturbate: false,
    } as Rules);
  }

  onPlayerClicked(player: IPlayer) {
    this.players = this.remove(this.players, player);
    this.roster.push(player);
    this.sortLists();
  }

  onRosterClicked(player: IPlayer) {
    this.roster = this.remove(this.roster, player);
    this.players.push(player);
    this.sortLists();
  }

  onStartClicked() {
    this.service.setPlayers(this.roster);
    this.router.navigate(['tournament']);
  }

  sortLists() {
    const sort = (a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    };
    this.players = this.players.sort(sort);
    this.roster = this.roster.sort(sort);
  }

  remove(list, value) {
    return list.filter(ele => ele !== value);
  }
}
