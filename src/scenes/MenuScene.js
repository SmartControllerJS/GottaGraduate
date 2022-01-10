import BaseScene from './BaseScene';
import 'smartcontroller';

class MenuScene extends BaseScene {

  constructor(config) {
    super('MenuScene', config);


    this.menu = [
      {scene:'PlayScene', text: 'Play'},
      {scene:'ScoreScene', text: 'Score'},
      {scene: null, text: 'Exit'},
    ]
  }

  // can use any function from basescene using super.class()
  create() {
    super.create();

    this.createMenu(this.menu);
  }
}

export default MenuScene;