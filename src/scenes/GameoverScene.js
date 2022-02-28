import Phaser from "phaser";
import PlayScene from "./PlayScene";

class GameoverScene extends Phaser.Scene {

  constructor(config) {
    super('GameoverScene');
    this.config = config;

    this.gameoverText = null;
    this.scoreText = null;
  }

  preload() {

  }

  create() {
    var style = {font: "64px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};

    this.gameoverText = this.add.text(370,20, 'GAMEOVER', {font: "bold 100px Arial", fill: '#FF0000'});
    this.scoreText = this.add.text(400,110, 'SCORES', style);

    this.gameoverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start('PlayScene');
      },
      callbackScope: this.scene,
      loop: false
    })
    // document.getElementById('qrcode').style.display = "none";
  }


  update() {

  }
}

export default GameoverScene;