import Phaser from "phaser";


const config = {
  // WebGL (Web graphics library) JS Api for rendering 2D and 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: 'arcade',
    arcade: {
      gravity: {
        y: 400
      },
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update,
  }
}

// loadinng assets, such as images, music, animations...
function preload() {
  // 'this' context -scene
  // contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

const VELOCITY = 200;
let bird = null;
let flapVelocity = 250;

function create() {
  // 0,0 is the topleft of the screen
  // default origin point is 0.5 0.5 which is the middle
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);
  
  this.input.on('pointerdown', flap);

  this.input.keyboard.on('keydown_SPACE', flap);
}



function update() {

}

function flap() {
  bird.body.velocity.y = -flapVelocity;;
}
new Phaser.Game(config);