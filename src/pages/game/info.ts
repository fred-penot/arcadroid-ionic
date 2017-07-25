import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonService } from '../../providers/common-service';
import { GameService } from '../../providers/game-service';

@Component({
  templateUrl: 'info.html',
  providers: [Storage, GameService, CommonService]
})

export class GameInfo {
  private gameInfo: any = {};
  private gameScreen: any = [];

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public gameService: GameService,
      public commonService: CommonService
  ) {
      this.init(this.params.get('gameId'));
  }

  init(gameId) {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getOneFull(gameId).then(data => {
      this.gameInfo.name = data[0]['name'];
      let rowCount:any = 0;
      let row: any = {};
      for(let screenview of data[0]['screenview']) {
        if (rowCount % 2 == 0) {
          row.img1 = screenview;
        } else {
          row.img2 = screenview;
          this.gameScreen.push(row);
          row = {};
        }
        rowCount++;
      }
      this.commonService.loadingHide();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
