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
      // gravity: {
      //   y: 400
      // },
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
  this.load.image('pipe', 'assets/pipe.png');
}

const VELOCITY = 200;
const PIPES_TO_RENDER = 10;

let bird = null;
let pipes = null;
 
let pipeHorizontalDistance = 0;

const pipeVerticalDistanceRange = [150, 250];

const initialBirdPOsition = {x: config.width / 10, y: config.height / 2}
const flapVelocity = 250;

function create() {
  // 0,0 is the topleft of the screen
  // default origin point is 0.5 0.5 which is the middle
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(initialBirdPOsition.x, initialBirdPOsition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group(); // dynamic group

  for (let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperPipe, lowerPipe);
  }

  pipes.setVelocityX(-200);
  
  
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}



function update() {

  if (bird.y > config.height || bird.y < -bird.height) {
    restartBirdPosition();
  }
}

function placePipe(uPipe, lPipe) {
  pipeHorizontalDistance += 400;
  pipeHorizontalDistance = getRightMostPipe();
  let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);    

  uPipe.x = pipeHorizontalDistance;
  uPipe.y = pipeVerticalPosition;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function getRightMostPipe() {

  
}

function restartBirdPosition() {
  bird.x = initialBirdPOsition.x;
  bird.y = initialBirdPOsition.y;
  bird.body.velocity.y = 0;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;;
}
new Phaser.Game(config);