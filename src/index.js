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
  this.load.image('bird', 'assets/bird.png');
}
let bird = null;

function create() {
  // 0,0 is the topleft of the screen
  // x - coordinate
  // y - coordinate
  // key of the image
  // default origin point is 0.5 0.5 which is the middle
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  // when no image is loaded a default sqaure is put into the scene
  bird = this.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
}
new Phaser.Game(config);