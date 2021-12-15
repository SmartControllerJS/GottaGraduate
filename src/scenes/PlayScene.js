import Phaser from "phaser";
import 'smartcontroller';

const PIPES_TO_RENDER = 4;


class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.bird = null;
    this.secondBird =
    this.pipes = null;

    this.pipeHorizontalDistance = 0;
    this.pipeVerticalDistanceRange = [150, 250];
    this.pipeHorizontalDistanceRange = [500, 550];

    this.flapVelocity = 250;
    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }

  create() {
    this.createBG();
    this.createBird();
    this.createPipes();
    this.createColliders();
    if (this.globalFlag == false) {
      this.createCode();
      this.globalFlag = true;
    }

  }


  update() {
    this.checkGameStatus();
    this.recyclePipes();
    this.handleCode();


    if (this.scanned == true) {
      console.log("hello");
      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(this.simplePeer.controllerList).length;
      console.log(size);
      // this.movement(controllerList[Object.keys(controllerList)[0]]);
      if (controllerList[Object.keys(controllerList)[0]].buttons['up'] == true) {
        this.bird.body.velocity.y = -this.flapVelocity;
      }
    }


  }


  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 400;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createCode() {
    this.simplePeer = new smartcontroller.NesSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/nesController.html', 'qrcode', 150, 150, '1');
    var selfP = this;
    this.simplePeer.on("connection", function(nes){ // this can also be outside the update loop that is a listener on it's own
      this.controller = nes; 
      selfP.scanned = true;
    })
    // this.movement(controllerList[Object.keys(controllerList)[0]]);
    // if (controllerList[Object.keys(controllerList)[0]].buttons['up'] == true) {
    //   this.bird.body.velocity.y = -this.flapVelocity;
    // }
  }

  handleCode() {

    // its not doing it because there is no contoller in the list

    // for (let i = 0; i < size; i++) {
    //   movement(controllerList[Object.keys(controllerList)[i]]);
    // }

    // this.input.on('pointerdown', this.flap, this);
    // this.input.keyboard.on('keydown_SPACE', this.flap, this);
  }

  // movement (playerController) {
  //   if (playerController.buttons['up'] == true) {
  //     this.bird.body.velocity.y = -this.flapVelocity;
  //   }
  // }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver();
    }
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);    
    const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    })
  }

  getRightMostPipe() {
    let rightMostX = 0;
  
    this.pipes.getChildren().forEach(function(pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    })
  
    return rightMostX;
  }
  
  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xEE4824);

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false

    })

  }
  
  flap() {
    this.bird.body.velocity.y = -this.flapVelocity;;
  }
}

export default PlayScene;