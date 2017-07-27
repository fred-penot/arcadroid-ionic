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
  private showButton: boolean = false;

  constructor(public navCtrl: NavController,
              public gameService: GameService,
              public commonService: CommonService) {
  }

  ionViewDidEnter() {
    this.init();
  }

  init() {
    this.commonService.loadingShow('Please wait...');
    this.gameScreen = [];
    this.gameName = '';
    this.showButton = false;
    this.gameService.getCurrent().then(dataCurrent => {
      if (dataCurrent != null) {
        this.showButton = true;
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
      } else {
        this.gameName = 'Aucun';
      }
      this.commonService.loadingHide();
    });
  }

  stop() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.stop().then(dataStop => {
      this.commonService.loadingHide();
      this.init();
    });
  }

  restart() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getCurrent().then(dataCurrent => {
      this.gameService.stop().then(dataStop => {
        this.gameService.launch(dataCurrent['id']);
        this.commonService.loadingHide();
        this.init();
      });
    });
  }
}
