import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import Player from "./helpers/player";

// const WIDTH = 800;
// const HEIGHT = 600;

// window.innerWidth * window.devicePixelRatio,
//   window.innerHeight * window.devicePixelRatio,

const SIZE_WIDTH_SCREEN = 1280
const SIZE_HEIGHT_SCREEN = 720

const SHARED_CONFIG = {
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
}

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    ...SHARED_CONFIG
  },
  scene: [new PlayScene(SHARED_CONFIG)]
}

new Phaser.Game(config);

