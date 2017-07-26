import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CommonService } from '../../providers/common-service';
import { GamePage } from '../game/game';
import { CurrentPage } from '../game/current';
import { SettingPage } from '../setting/setting';
import { Tabs, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
  providers: [Storage, CommonService]
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = GamePage;
  tab2Root: any = CurrentPage;
  //tab3Root: any = SettingPage;

  constructor(public navCtrl: NavController) {

  }
}
