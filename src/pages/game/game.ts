import { Component } from '@angular/core';
import { Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { CommonService } from '../../providers/common-service';
import { GameService } from '../../providers/game-service';
import { GameInfo } from '../../pages/game/info';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [GameService, CommonService]
})
export class GamePage {
  private gameList: any = [];
  private emulatorList: any = [];
  private emulatorId:any = 1;

  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public gameService: GameService, public commonService: CommonService) {
    this.init();
  }

  init() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getEmulator().then(data => {
      this.emulatorList = data;
      this.emulatorId = 1;
    });
    this.gameService.getList().then(data => {
      this.gameList = data;
      this.commonService.loadingHide();
    });
  }

  openMenu(gameId) {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'game-menu',
      buttons: [
        {
          text: 'Infos',
          icon: !this.platform.is('ios') ? 'ios-information-circle-outline' : null,
          handler: () => {
            this.openModal({"gameId": gameId});
          }
        },
        {
          text: 'Lancer',
          icon: !this.platform.is('ios') ? 'ios-flash-outline' : null,
          handler: () => {
            this.commonService.loadingShow('Please wait...');
            this.gameService.getCurrent().then(dataCurrent => {
              if (dataCurrent != null) {
                this.gameService.stop().then(dataStop => {});
              }
              this.gameService.launch(gameId);
              this.commonService.loadingHide();
            });
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Annuler clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openModal(gameId) {
    let modal = this.modalCtrl.create(GameInfo, gameId);
    modal.present();
  }

  refreshList() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getEmulatorList(this.emulatorId).then(data => {
      this.gameList = data;
      this.commonService.loadingHide();
    });
  }
}

