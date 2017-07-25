import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CommonService } from '../../providers/common-service';
import { GameService } from '../../providers/game-service';

@Component({
  selector: 'page-current',
  templateUrl: 'current.html',
  providers: [Storage, GameService, CommonService]
})
export class CurrentPage {
  private gameName: any = 'Aucun';
  private gameScreen: any = [];

  constructor(public navCtrl: NavController,
              public gameService: GameService,
              public commonService: CommonService) {

    this.init();
  }

  init() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getCurrent().then(dataCurrent => {
      if (dataCurrent != null) {
        this.gameName = dataCurrent['name'];
        let rowCount:any = 0;
        let row: any = {};
        for(let screenview of dataCurrent['screenview']) {
          if (rowCount % 2 == 0) {
            row.img1 = screenview;
          } else {
            row.img2 = screenview;
            this.gameScreen.push(row);
            row = {};
          }
          rowCount++;
        }
      }
      this.commonService.loadingHide();
    });
  }
}
