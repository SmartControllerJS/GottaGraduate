import BaseScene from './BaseScene';
import 'smartcontroller';

class MenuScene extends BaseScene {

  constructor(config) {
    super('MenuScene', config);
  }

  // can use any function from basescene using super.class()
  create() {
    super.create();
    this.scene.start('PlayScene');
  }
}

export default MenuScene;