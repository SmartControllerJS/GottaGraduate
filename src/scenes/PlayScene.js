import Phaser, { RIGHT } from "phaser";
import "smartcontroller";
import { Player } from "../helpers/player.js";
import { Beer } from "../helpers/beer.js";

const ANIMATIONS = [['right','up','left','down','turn'],
                    ['right1','up1','left1','down1','turn1'],
                    ['right2','up2','left2','down2','turn2'],
                    ['right3','up3','left3','down3','turn3']]
class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;
    this.startLayer = null;
    this.overlapStart = null;

    // smartcontroller
    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;
    this.playerList = [];

    // map layers
    this.collision_layer = null;
    this.object_collision_layer = null;
    this.church_collision_layer = null;
    this.church_roof_collision_layer = null;

    // players
    this.player = null;
    this.player2 = null;
    this.player3 = null;
    this.player4 = null;
    this.numberOfScans = 0;

    // items
    this.badItems = null;
    this.beer = null;
    this.beer2 = null;
    this.beer3 = null;
    this.beer4 = null;
    this.beer5 = null;

    this.cursors = null;
    this.scoreText = null;
    this.score = 120;
    this.playerVelocity = 200;

    this.index = 0;
 
    this.item = null;

    this.goodItem = null;
    this.itemBounds = null;
    this.itemArray = null;
    this.beerGroup = null;
    this.beerGroupArray = null;

    // timer
    this.text = null;
    this.initialTime = 90;
  }

  preload() {
    this.loadImages();
  }

  create() {
    this.createCode();
    this.createCollidableMap();
    this.createCharacter()
    this.createNonCollidablemMap();

    this.badItems = this.physics.add.group();
    this.timedItem();
    this.beerGroup = this.physics.add.group();
    this.createBeerItem();
    this.timedBeer();
    this.goodItems = this.physics.add.group();
    this.timedGoodItem();

    this.createPlayerAnimation(['left', 'right', 'up', 'down'], [12, 24, 36, 0], [14, 26, 38, 2], ['turn', 1]);
    this.createPlayerAnimation(['left1', 'right1', 'up1', 'down1'], [15, 27, 39, 3], [17, 29, 41, 5], ['turn1', 4]);
    this.createPlayerAnimation(['left2', 'right2', 'up2', 'down2'], [18, 30, 42, 6], [20, 32, 44, 8], ['turn2', 7]);
    this.createPlayerAnimation(['left3', 'right3', 'up3', 'down3'], [60, 72, 84, 48], [62, 74, 86, 50], ['turn3', 49]);

    this.scale.displaySize.setAspectRatio( this.width/this.height );
    this.scale.refresh();

    this.scoreText = this.add.text(this.player.x, 600, "Credits:" + this.score, {fontSize: '12px', color: '#000'});
    this.tweens.add({
      targets: this.scoreText,
      x: this.scoreText.x + this.player.x,
      ease: 'Linear',
      duration: 1,
      delay: 1,
      yoyo: false,
      repeat: -1
    })

    this.text = this.add.text(600, 32, 'Countdown: ' + this.formatTime(this.initialTime), { fontSize: '40px', fill: '#000' });
    this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    this.time.addEvent({ delay: 90000, callback: this.goodGuysWin, callbackScope: this, loop: false });
  }


  update() {

    this.itemArray = this.badItems.children.getArray();
    this.beerGroupArray = this.beerGroup.children.getArray();
    if (this.scanned == true) {
      this.removeItem();
      this.removeBeerSprite();
      this.removeGoodItem();

      if (this.physics.overlap(this.player, this.overlapStart)) {
        alert('START THE GAME');
      }

      this.scoreText.x = this.player.body.position.x;  
      this.scoreText.y = this.player.body.position.y -10;  
  
      if (this.score <= 0) {
        alert('gameover')
      }

      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(controllerList).length;
      for (let i = 0; i < size; i++) {
        if (controllerList[Object.keys(controllerList)[i]].isActive && (typeof controllerList[Object.keys(controllerList)[i]].state.angle.degree !== "undefined")) {
          if (controllerList[Object.keys(controllerList)[i]].state.angle.degree > 295 || controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 45) {
            this.playerList[i].body.velocity.x = this.playerVelocity;
            this.playerList[i].body.velocity.y = 0;
            this.playerList[i].anims.play(ANIMATIONS[i][0], true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 45 && controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 115) {
            this.playerList[i].body.velocity.y = -this.playerVelocity;
            this.playerList[i].body.velocity.x = 0;
            this.playerList[i].anims.play(ANIMATIONS[i][1], true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 115 && controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 225) {
            this.playerList[i].body.velocity.x = -this.playerVelocity;
            this.playerList[i].body.velocity.y = 0;
            this.playerList[i].anims.play(ANIMATIONS[i][2], true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 225 && controllerList[Object.keys(controllerList)[i]].state.angle.degree  <= 295) {
            this.playerList[i].body.velocity.y = this.playerVelocity;
            this.playerList[i].body.velocity.x = 0;
            this.playerList[i].anims.play(ANIMATIONS[i][3], true);
          }
        }
        else {
          this.playerList[i].body.velocity.y = 0;
          this.playerList[i].body.velocity.x = 0;
          this.playerList[i].anims.play(ANIMATIONS[i][4], true);
        }
      }
    }
  }

  createCollidableMap() {
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')
    map.createLayer('Bottom of floor', tileset)
    map.createLayer('Top of floor', tileset)
    this.startLayer = map.createLayer('Start layer', tileset);
    map.createLayer('Fauna and flora', tileset)

    this.collision_layer = map.createLayer('Outside', tileset).setCollisionByExclusion([-1]);
    this.object_collision_layer = map.createLayer('Furniture and trees', tileset).setCollisionByExclusion([-1]);
    this.church_collision_layer = map.createLayer('Church', tileset).setCollisionByExclusion([-1]);
    this.church_roof_collision_layer = map.createLayer('Church roof', church_roof_tileset).setCollisionByExclusion([-1]);

    this.overlapStart = map.createFromObjects('Start game', {
      id: 19
    });

    this.overlapStart.forEach(start => {
      this.physics.world.enable(start);
    })
  }

  createNonCollidablemMap() {
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_window_tileset = map.addTilesetImage('church staoined glass', 'stained_glass_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')
    map.createLayer('Wall Decoration', tileset)
    map.createLayer('Church roof no collision', church_roof_tileset);
    map.createLayer('Church window', church_window_tileset)
  }

  decrementScore() {
    this.score -= 10;
    this.scoreText.setText(`Credits: ${this.score}`);
  } 

  removeItem() {
    var itemArray = this.badItems.children.getArray();
    for (let i = 0; i < this.itemArray.length; i++) {
      if (this.physics.overlap(this.player, itemArray[i])) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player2, itemArray[i]) && this.numberOfScans == 2) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player3, itemArray[i]) && this.numberOfScans == 3) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player4, itemArray[i]) && this.numberOfScans == 4) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else {
        continue;
      }
    }
  }

  removeGoodItem() {
    var itemArray = this.goodItems.children.getArray();
    for (let i = 0; i < this.itemArray.length; i++) {
      if (this.physics.overlap(this.player, itemArray[i])) {
        itemArray[i].destroy();
        // this.score += 5;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player2, itemArray[i]) && this.numberOfScans == 2) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player3, itemArray[i]) && this.numberOfScans == 3) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player4, itemArray[i]) && this.numberOfScans == 4) {
        itemArray[i].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else {
        continue;
      }
    }
  }

  removeBeerSprite() {
    var beerArray = this.beerGroup.children.getArray();
    for (let j = 0; j < this.beerGroupArray.length; j++) {
      if (this.physics.overlap(this.player, beerArray[j])) {
        beerArray[j].destroy();
        this.playerVelocity /= 2;
      }
      else if (this.physics.overlap(this.player2, beerArray[j]) && this.numberOfScans == 2) {
        beerArray[j].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player3, beerArray[j]) && this.numberOfScans == 3) {
        beerArray[j].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else if (this.physics.overlap(this.player4, beerArray[j]) && this.numberOfScans == 4) {
        beerArray[j].destroy();
        // this.score -= 10;
        // this.scoreText.setText(`Credits: ${this.score}`);
      }
      else {
        continue;
      }
    }
  }

  getRandomArbitrary() {
    return Math.random() * (0 - 700) + 720;
  }

  getRandomArbitraryX() {
    return Math.random() * (0 - 1200) + 1200;
  }

  createBadItem() {
    var socialMediaImages = ["netflix", "instagram", "youtube", "facebook", "tiktok"];
    var randomNumber = Math.floor(Math.random()*socialMediaImages.length);
    var xPosition = randomNumber < 0.5 ? 0 : 2000;
    this.item = this.badItems.create(xPosition, this.getRandomArbitrary(), socialMediaImages[randomNumber]);
    this.item.setBounce(1).setCollideWorldBounds(true);
    this.moveIndividual(this.item);
  }

  createGoodItem() {
    var randomNumber = Math.random();
    var xPosition = randomNumber < 0.5 ? 0 : 2000;
    this.goodItem = this.goodItems.create(xPosition, this.getRandomArbitrary(), 'ipad').setScale(2);
    this.goodItem.setBounce(1).setCollideWorldBounds(true);
    this.moveIndividual(this.goodItem);
    this.goodItem.setSize(20, 20);
  }

  createBeerItem() {
    this.anims.create({
      key: 'floating',
      frames: this.anims.generateFrameNumbers('beer', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    var randomNumber = Math.random();
    var yPosition = randomNumber < 0.5 ? -100 : 1500
    this.beer = new Beer(this, this.getRandomArbitraryX(), yPosition);
    this.beer.anims.play('floating', this);
  }

  timedItem() {
    this.timedEvent = this.time.addEvent({
      delay: 3000,
      callback: this.createBadItem,
      callbackScope: this,
      loop: true,
    })
  }

  timedBeer() {
    this.timedEvent = this.time.addEvent({
      delay: 15000,
      callback: this.createBeerItem,
      callbackScope: this,
      loop: true,
    })
  }

  timedGoodItem() {
    this.timedEvent = this.time.addEvent({
      delay: 10000,
      callback: this.createGoodItem,
      callbackScope: this,
      loop: true,
    })
  }

  moveIndividual(item) {
    item.setVelocity(Phaser.Math.Between(10, 300), Phaser.Math.Between(10, 300));
  }
  moveIndividualBeer(item) {
    item.setVelocity(Phaser.Math.Between(10, 150), Phaser.Math.Between(10, 150));
  }

  createCharacter() {
    this.player = new Player(this, 100, 450);
    this.player2 = new Player(this, 200, 450);
    this.player3 = new Player(this, 300, 450);
    this.player4 = new Player(this, 400, 450);
    this.playerList.push(this.player);
    this.playerList.push(this.player2);
    this.playerList.push(this.player3);
    this.playerList.push(this.player4);
    // this.scoreText = this.add.text(this.player.x, 600, "Credits:" + this.score, {fontSize: '12px', color: '#000'});

    // this.tweens.add({
    //   targets: this.scoreText,
    //   x: this.scoreText.x + this.player.x,
    //   ease: 'Linear',
    //   duration: 1,
    //   delay: 1,
    //   yoyo: false,
    //   repeat: -1
    // })
  }

  createCode() {
    // this.scene.pause();
    // this.physics.pause();
    // this.isPaused = true;
    this.simplePeer = new smartcontroller.JoystickSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/joystick.html', 'qrcode', 175, 175); // joystick.html
    var selfP = this;
    this.simplePeer.on("connection", function(){ // this can also be outside the update loop that is a listener on it's own
      // selfP.createCharacter();
      selfP.numberOfScans++;
      selfP.scanned = true;
      selfP.player.setVisible(true);
      if (selfP.numberOfScans == 2 ) {
        selfP.player2.setVisible(true);
      }
      else if (selfP.numberOfScans == 3 ) {
        selfP.player3.setVisible(true);
      }
      else if (selfP.numberOfScans == 4 ) {
        selfP.player4.setVisible(true);
        document.getElementById('qrcode').style.display = "none";
      }
      // selfP.scene.resume();
      // selfP.physics.resume();
    })
  }

  // round timer functions
  formatTime(seconds){
    // Minutes
      var minutes = Math.floor(seconds/60);
      // Seconds
      var partInSeconds = seconds%60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2,'0');
      // Returns formated time
    return `${minutes}:${partInSeconds}`;
    }

  onEvent () {
    this.initialTime -= 1; // One second
    this.text.setText('Countdown: ' + this.formatTime(this.initialTime));
  }

  goodGuysWin() {
    alert("The Good Guys Win :)");
  }

  createPlayerAnimation(directions, start, end, idleFrame) {
    for (let i = 0; i < start.length; i++) {
      this.anims.create({
        key: directions[i],
        frames: this.anims.generateFrameNames('dude', { start: start[i], end: end[i]}),
        frameRate: 10,
        repeat: -1,
      });
    }
    this.anims.create({
        key: idleFrame[0],
        frames: [ { key: 'dude', frame: idleFrame[1] } ],
        frameRate: 10
    });
  }

  loadImages() {
    this.load.image('base_tiles', 'assets/base_tiles.png')
    this.load.image('church_tiles', 'assets/church_tiles.png')
    this.load.image('stained_glass_tiles', 'assets/stained_glass_tiles.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/base_tiles.json')
    this.load.spritesheet('dude', 
      'assets/dude.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('beer', 
      'assets/beer.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.image('tiktok', 'assets/tiktok.png')
    this.load.image('facebook', 'assets/facebook.png')
    this.load.image('instagram', 'assets/instagram.png')
    this.load.image('netflix', 'assets/netflix.png')
    this.load.image('youtube', 'assets/youtube.png')
    this.load.image('ipad', 'assets/ipad.png');
  }
}

export default PlayScene;