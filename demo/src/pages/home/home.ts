import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WYImageViewerController} from "image-shower/bin/components/wy-image-viewer/wy-image-viewer.controller";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcList: string[] = ['./assets/imgs/logo.png', './assets/imgs/logo.png', './assets/imgs/logo.png']

  constructor(public navCtrl: NavController, public showerCtrl: WYImageViewerController) {

  }

  actionShow($target) {
    this.showerCtrl.create($target.target, {imageList: this.srcList}).present();
  }
}
