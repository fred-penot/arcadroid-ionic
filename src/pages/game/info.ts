import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'info.html'
})

export class GameInfo {
  character;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    console.log('ModalContentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
