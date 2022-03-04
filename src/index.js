import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import GameoverScene from "./scenes/GameoverScene";

const SIZE_WIDTH_SCREEN = 1280
const SIZE_HEIGHT_SCREEN = 720

const SHARED_CONFIG = {
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
}

const SCENES = [PlayScene, GameoverScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => SCENES.map(createScene);

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    ...SHARED_CONFIG
  },
  scene: initScenes(),
}

new Phaser.Game(config);

