import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonService } from '../../providers/common-service';
import { GameService } from '../../providers/game-service';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [GameService, CommonService]
})
export class GamePage {
  private gameList: any = [];

  constructor(public navCtrl: NavController, public gameService: GameService,
              public commonService: CommonService) {
    this.init();
  }

  init() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getList().then(data => {
      this.gameList = data;
      this.commonService.loadingHide();
    });
  }
}
