import BaseScene from './BaseScene';
import 'smartcontroller';

const PIPES_TO_RENDER = 4;


class PlayScene extends BaseScene {

  constructor(config) {
    super('PlayScene', config);

    this.bird = null;
    this.secondBird = null;
    this.thirdBird = null;
    this.pipes = null;
    this.isPaused = false;

    this.pipeHorizontalDistance = 0;
    this.flapVelocity = 250;

    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;

    this.playerList = [];

    this.score = 0;
    this.scoreText = '';

    // difficulties
    this.currentDifficulty = 'easy';
    this.difficulties = {
      'easy': {
        pipeHorizontalDistanceRange: [300, 350],
        pipeVerticalDistanceRange: [150, 200],
      },
      'normal': {
        pipeHorizontalDistanceRange: [290, 340],
        pipeVerticalDistanceRange: [140, 190],
      },
      'hard': {
        pipeHorizontalDistanceRange: [280, 330],
        pipeVerticalDistanceRange: [130, 180],
      }
    }
  }

  create() {
    this.currentDifficulty = 'easy';
    super.create();
    this.createBird();
    this.createSecondBird();
    this.createThirdBird();
    this.createScore();
    this.createPipes();
    this.createColliders();
    this.createPause();
    this.listenToEvents();
    if (this.globalFlag == false) {
      this.createCode();
      this.globalFlag = true;
    }


    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15}),
      frameRate: 8, // 8 frames per second - 8 images
      repeat: -1 // repeat infinitely
    });

    this.bird.play('fly');
    this.secondBird.play('fly');
    this.thirdBird.play('fly');
  }

  update() {


    this.checkGameStatus();
    this.recyclePipes();


    if (this.scanned == true) {
      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(this.simplePeer.controllerList).length;
      for (let i = 0; i < size; i++) {
        console.log(this.playerList[i].text);
        if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 0) {
          this.bird.body.velocity.y = -this.flapVelocity;
        } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 1) {
          this.secondBird.body.velocity.y = -this.flapVelocity;
        } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 2) {
          this.thirdBird.body.velocity.y = -this.flapVelocity;
        }
      }
    }
  }

  listenToEvents() {
    if (this.pauseEvent) { return; }
    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      })
    });
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText('Fly in: ' + this.initialTime);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0).setScale(3).setFlipX(true);
    this.bird.setBodySize(this.bird.width, this.bird.height - 8);
    this.playerList.push(this.bird);
    this.bird.body.gravity.y = 400;
    this.bird.setCollideWorldBounds(true);
  }

  createSecondBird() {
    this.secondBird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y + 50, 'bird').setOrigin(0).setScale(3).setFlipX(true);
    this.bird.setBodySize(this.secondBird.width, this.secondBird.height - 8);
    this.playerList.push(this.secondBird);
    this.secondBird.body.gravity.y = 400;
    this.secondBird.setTint(0x0000FF);
    this.secondBird.setCollideWorldBounds(true);
  }

  createThirdBird() {
    this.thirdBird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y - 50, 'bird').setOrigin(0).setScale(3).setFlipX(true);
    this.bird.setBodySize(this.thirdBird.width, this.thirdBird.height - 8);
    this.playerList.push(this.thirdBird);
    this.thirdBird.body.gravity.y = 400;
    this.thirdBird.setTint(0xFF0000);
    this.thirdBird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();
    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(-3, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setOrigin(-3, 0);
      this.placePipe(upperPipe, lowerPipe);
    }
    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.invisibleBird, null, this);
    this.physics.add.collider(this.secondBird, this.pipes, this.invisibleSecondBird, null, this);
    this.physics.add.collider(this.thirdBird, this.pipes, this.invisibleThirdBird, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000' });
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' });
  }

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause').setOrigin(1).setScale(3).setInteractive();

    pauseButton.on('pointerdown', () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
      this.countDownText.destroy();
      this.timedEvent.remove();
    })
    
  }

  createCode() {
    this.scene.pause();
    this.physics.pause();
    this.isPaused = true;
    this.simplePeer = new smartcontroller.NesSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/nesController.html', 'qrcode', 150, 150, '1');
    var selfP = this;
    this.simplePeer.on("connection", function(nes){ // this can also be outside the update loop that is a listener on it's own
      this.controller = nes; 
      selfP.scanned = true;
      selfP.scene.resume();
    })
  }

  movement (playerController, player) {
    if (playerController.buttons['up'] == true) {
      player = -this.flapVelocity;
    }
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.bird.setVisible(false);
    }
    else if (this.secondBird.getBounds().bottom >= this.config.height || this.secondBird.y <= 0) {
      this.secondBird.setVisible(false);
    }
    if (this.thirdBird.getBounds().bottom >= this.config.height - 2 || this.thirdBird.y <= 0) {
      this.thirdBird.setVisible(false);
    }
    if (this.secondBird.visible == false && this.bird.visible == false && this.thirdBird.visible == false){
      this.gameOver();
    }
  }

  placePipe(uPipe, lPipe) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);    
    const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);

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
          this.increaseScore();
          this.saveBestScore();
          this.increaseDifficulty();
        }
      }
    })
  }

  increaseDifficulty() {
    if (this.score === 1) {
      this.currentDifficulty = 'normal';
    }

    if (this.score === 3) {
      this.currentDifficulty = 'hard';
    }
  }

  getRightMostPipe() {
    let rightMostX = 0;
  
    this.pipes.getChildren().forEach(function(pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    })
  
    return rightMostX;
  }

  invisibleBird() {
    this.bird.setVisible(false);
  }

  invisibleSecondBird() {
    this.secondBird.setVisible(false);
  }

  invisibleThirdBird() {
    this.thirdBird.setVisible(false);
  }
  
  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }
  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xEE4824);
    this.secondBird.setTint(0xEE4824);
    this.thirdBird.setTint(0xEE4824);

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false

    })

  }
  
  flap() {
    if (this.isPaused) { return; }
    this.bird.body.velocity.y = -this.flapVelocity;;
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}

export default PlayScene;