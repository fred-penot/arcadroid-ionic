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

  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public gameService: GameService, public commonService: CommonService) {
    this.init();
  }

  init() {
    this.commonService.loadingShow('Please wait...');
    this.gameService.getList().then(data => {
      this.gameList = data;
      this.commonService.loadingHide();
    });
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'game-menu',
      buttons: [
        {
          text: 'Infos',
          icon: !this.platform.is('ios') ? 'ios-information-circle-outline' : null,
          handler: () => {
            console.log('Infos clicked');
            this.openModal();
          }
        },
        {
          text: 'Lancer',
          icon: !this.platform.is('ios') ? 'ios-flash-outline' : null,
          handler: () => {
            console.log('Lancer clicked');
          }
        },
        {
          text: 'Stopper',
          icon: !this.platform.is('ios') ? 'ios-power-outline' : null,
          handler: () => {
            console.log('Stopper clicked');
          }
        },
        {
          text: 'Relancer',
          icon: !this.platform.is('ios') ? 'ios-refresh-outline' : null,
          handler: () => {
            console.log('Relancer clicked');
          }
        },
        {
          text: 'Annuler',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Annuler clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openModal() {
    let modal = this.modalCtrl.create(GameInfo);
    modal.present();
  }
}

