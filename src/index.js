import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

// const WIDTH = 800;
// const HEIGHT = 600;

const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 270
const MIN_SIZE_HEIGHT_SCREEN = 480
const SIZE_WIDTH_SCREEN = 800
const SIZE_HEIGHT_SCREEN = 600

const SHARED_CONFIG = {
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
  min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN
  },
  max: {
      width: MAX_SIZE_WIDTH_SCREEN,
      height: MAX_SIZE_HEIGHT_SCREEN
  }
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    // ...
  },
  scene: [new PlayScene(SHARED_CONFIG)]
}

const game = new Phaser.Game(config);

game.screenBaseSize = {
  maxWidth: MAX_SIZE_WIDTH_SCREEN,
  maxHeight: MAX_SIZE_HEIGHT_SCREEN,
  minWidth: MIN_SIZE_WIDTH_SCREEN,
  minHeight: MIN_SIZE_HEIGHT_SCREEN,
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN
}