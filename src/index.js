import Phaser, { Scene } from "phaser";
import PlayScene from "./scenes/PlayScene";

// const WIDTH = 800;
// const HEIGHT = 600;

// window.innerWidth * window.devicePixelRatio,
//   window.innerHeight * window.devicePixelRatio,

const SIZE_WIDTH_SCREEN = 800
const SIZE_HEIGHT_SCREEN = 600

const SHARED_CONFIG = {
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
}

// order matter here
const Scenes = [PlayScene]
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scale: {
    parent: 'qrcode',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    ...SHARED_CONFIG
  },
  scene: [new PlayScene(SHARED_CONFIG)]
}

new Phaser.Game(config);

