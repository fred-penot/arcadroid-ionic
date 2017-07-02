import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CommonService } from '../../providers/common-service';
import { GamePage } from '../game/game';
import { SettingPage } from '../setting/setting';
import { Tabs, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
  providers: [Storage, CommonService]
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GamePage;
  tab2Root: any = SettingPage;

  constructor(public navCtrl: NavController) {

  }
}
