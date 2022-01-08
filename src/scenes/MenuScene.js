import Phaser from "phaser";
import 'smartcontroller';

class MenuScene extends Phaser.Scene {

  constructor(config) {
    super('MenuScene');
    this.config = config;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
  }

  create() {
    this.createBG();

  }

  update() {

  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }
}

export default MenuScene;