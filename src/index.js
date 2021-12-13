import Phaser from "phaser";


const config = {
  // WebGL (Web graphics library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade',
  },
  scene: {
    preload,
    create,
  }
}

// loadinng assets, such as images, music, animations...
function preload() {
  // 'this' context -scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
}

function create() {
  // 0,0 is the topleft of the screen
  // x - coordinate
  // y - coordinate
  // key of the image
  this.add.image(config.width / 2, config.height / 2, 'sky');
}
new Phaser.Game(config);