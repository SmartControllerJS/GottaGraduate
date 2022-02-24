import Phaser from "phaser";
import "smartcontroller";
import { Player } from "../helpers/player.js";
import { Beer } from "../helpers/beer.js";

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;

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
    if (this.globalFlag == false) {
      this.createCode();
      this.globalFlag = true;
    }
    this.createCollidableMap();

    this.createCharacter()
    this.player.setVisible(false);
    this.player2.setVisible(false);
    this.playerList.push(this.player);
    this.playerList.push(this.player2);
    this.createNonCollidablemMap();

    this.badItems = this.physics.add.group();
    this.timedItem();

    this.beerGroup = this.physics.add.group();
    this.createBeerItem();
    this.timedBeer();
    this.goodItems = this.physics.add.group();
    this.timedGoodItem();


    this.createPlayerAnimation(['left', 'right', 'up', 'down'], [12, 24, 36, 0], [14, 26, 38, 2], ['turn', 1]);
    this.createPlayerAnimation(['left1', 'right1', 'up1', 'down1'], [12, 24, 36, 0], [14, 26, 38, 2], ['turn', 1]);
    this.scale.displaySize.setAspectRatio( this.width/this.height );
    this.scale.refresh();
    // if (this.globalFlag == false) {
    //   this.createCode();
    //   this.globalFlag = true;
    // }


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

    this.text = this.add.text(600, 32, 'Countdown: ' + this.formatTime(this.initialTime), { fontSize: '40px', fill: '#000' });
    // this.scoreText = this.add.text(this.player.x, 600, "Credits:" + this.score, {fontSize: '12px', color: '#000'});
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

      // this.scoreText.x = this.player.body.position.x;  
      // this.scoreText.y = this.player.body.position.y -10;  
  
      if (this.score <= 0) {
        alert('gameover')
      }
    
      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(controllerList).length;
      console.log(size);
      for (let i = 0; i < size; i++) {
        var joystickController = controllerList[Object.keys(controllerList)[0]]
        var joystickController1 = controllerList[Object.keys(controllerList)[i]]
        if (controllerList[Object.keys(controllerList)[i]].isActive && (typeof controllerList[Object.keys(controllerList)[i]].state.angle.degree !== "undefined")) {
          if (controllerList[Object.keys(controllerList)[i]].state.angle.degree > 295 || controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 45) {
            this.playerList[i].body.velocity.x = this.playerVelocity;
            this.playerList[i].body.velocity.y = 0;
            this.playerList[i].anims.play('right', true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 45 && controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 115) {
            this.playerList[i].body.velocity.y = -this.playerVelocity;
            this.playerList[i].body.velocity.x = 0;
            this.playerList[i].anims.play('up', true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 115 && controllerList[Object.keys(controllerList)[i]].state.angle.degree <= 225) {
            this.playerList[i].body.velocity.x = -this.playerVelocity;
            this.playerList[i].body.velocity.y = 0;
            this.playerList[i].anims.play('left', true);
          }
          else if (controllerList[Object.keys(controllerList)[i]].state.angle.degree  > 225 && controllerList[Object.keys(controllerList)[i]].state.angle.degree  <= 295) {
            this.playerList[i].body.velocity.y = this.playerVelocity;
            this.playerList[i].body.velocity.x = 0;
            this.playerList[i].anims.play('down', true);
          }
          else{
            this.playerList[i].body.velocity.y = 0;
            this.playerList[i].body.velocity.x = 0;
            this.playerList[i].anims.play('turn', true);
          }
        }
        else {
          this.playerList[i].body.velocity.y = 0;
          this.playerList[i].body.velocity.x = 0;
          this.playerList[i].anims.play('turn', true);
        }
      }


    //   var joystickController = controllerList[Object.keys(controllerList)[0]]
    //   var joystickController1 = controllerList[Object.keys(controllerList)[1]]
    //   if (this.numberOfScans == 1) {
    //     if (joystickController.isActive && (typeof joystickController.state.angle.degree !== "undefined")) {
    //       console.log(joystickController.state.angle.degree);
    //       if(joystickController.state.angle.degree > 295|| joystickController.state.angle.degree <= 45 ) {
    //         this.player.body.velocity.x = this.playerVelocity;
    //         this.player.body.velocity.y = 0;
    //         this.player.anims.play('right', true);
    //       }
    //       else if (joystickController.state.angle.degree > 45 && joystickController.state.angle.degree <= 115) {
    //         this.player.body.velocity.y = -this.playerVelocity;
    //         this.player.body.velocity.x = 0;
    //         this.player.anims.play('up', true);
    //       }
    //       else if (joystickController.state.angle.degree > 115 && joystickController.state.angle.degree <= 225) {
    //         this.player.body.velocity.x = -this.playerVelocity;
    //         this.player.body.velocity.y = 0;
    //         this.player.anims.play('left', true);
    //       }
    //       else if (joystickController.state.angle.degree > 225 && joystickController.state.angle.degree <= 295) {
    //         this.player.body.velocity.y = this.playerVelocity;
    //         this.player.body.velocity.x = 0;
    //         this.player.anims.play('down', true);
    //       }
    //       else{
    //         this.player.body.velocity.y = 0;
    //         this.player.body.velocity.x = 0;
    //         this.player.anims.play('turn', true);
    //       }
    //     }
    //     else {
    //       this.player.body.velocity.y = 0;
    //       this.player.body.velocity.x = 0;
    //       this.player.anims.play('turn', true);
    //     }
    //  }

    //   else if (this.numberOfScans == 3) {

    //     if (joystickController.isActive && (typeof joystickController.state.angle.degree !== "undefined")) {
    //       console.log(joystickController.state.angle.degree);
    //     if(joystickController.state.angle.degree > 295|| joystickController.state.angle.degree <= 45 ) {
    //       this.player.body.velocity.x = this.playerVelocity;
    //       this.player.body.velocity.y = 0;
    //       this.player.anims.play('right', true);
    //     }
    //     else if (joystickController.state.angle.degree > 45 && joystickController.state.angle.degree <= 115) {
    //       this.player.body.velocity.y = -this.playerVelocity;
    //       this.player.body.velocity.x = 0;
    //       this.player.anims.play('up', true);
    //     }
    //     else if (joystickController.state.angle.degree > 115 && joystickController.state.angle.degree <= 225) {
    //       this.player.body.velocity.x = -this.playerVelocity;
    //       this.player.body.velocity.y = 0;
    //       this.player.anims.play('left', true);
    //     }
    //     else if (joystickController.state.angle.degree > 225 && joystickController.state.angle.degree <= 295) {
    //       this.player.body.velocity.y = this.playerVelocity;
    //       this.player.body.velocity.x = 0;
    //       this.player.anims.play('down', true);
    //     }
    //     else{
    //       this.player.body.velocity.y = 0;
    //       this.player.body.velocity.x = 0;
    //       this.player.anims.play('turn', true);
    //     }
    //   }
    //   else {
    //     this.player.body.velocity.y = 0;
    //     this.player.body.velocity.x = 0;
    //     this.player.anims.play('turn', true);
    //   }

    //     console.log(joystickController1);
    //     if (joystickController1.isActive && (typeof joystickController1.state.angle.degree !== "undefined")) {
    //       console.log(joystickController1.state.angle.degree);
    //     if(joystickController1.state.angle.degree > 295|| joystickController1.state.angle.degree <= 45 ) {
    //       this.player2.body.velocity.x = this.playerVelocity;
    //       this.player2.body.velocity.y = 0;
    //       this.player2.anims.play('right1', true);
    //     }
    //     else if (joystickController1.state.angle.degree > 45 && joystickController1.state.angle.degree <= 115) {
    //       this.player2.body.velocity.y = -this.playerVelocity;
    //       this.player2.body.velocity.x = 0;
    //       this.player2.anims.play('up1', true);
    //     }
    //     else if (joystickController1.state.angle.degree > 115 && joystickController1.state.angle.degree <= 225) {
    //       this.player2.body.velocity.x = -this.playerVelocity;
    //       this.player2.body.velocity.y = 0;
    //       this.player2.anims.play('left1', true);
    //     }
    //     else if (joystickController1.state.angle.degree > 225 && joystickController1.state.angle.degree <= 295) {
    //       this.player2.body.velocity.y = this.playerVelocity;
    //       this.player2.body.velocity.x = 0;
    //       this.player2.anims.play('down1', true);
    //     }
    //     else{
    //       this.player2.body.velocity.y = 0;
    //       this.player2.body.velocity.x = 0;
    //       this.player2.anims.play('turn', true);
    //     }
    //   }
    //   else {
    //     this.player2.body.velocity.y = 0;
    //     this.player2.body.velocity.x = 0;
    //     this.player2.anims.play('turn', true);
    //   }
    //   }
    }
  }

  createCollidableMap() {
    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset images we are using
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')

    map.createLayer('Bottom of floor', tileset)
    map.createLayer('Top of floor', tileset)
    map.createLayer('Fauna and flora', tileset)

    this.collision_layer = map.createLayer('Outside', tileset)
    this.object_collision_layer = map.createLayer('Furniture and trees', tileset)
    this.church_collision_layer = map.createLayer('Church', tileset)
    this.church_roof_collision_layer = map.createLayer('Church roof', church_roof_tileset)

    this.collision_layer.setCollisionByExclusion([-1]);
    this.object_collision_layer.setCollisionByExclusion([-1]);
    this.church_collision_layer.setCollisionByExclusion([-1]);
    this.church_roof_collision_layer.setCollisionByExclusion([-1]);
  }

  createNonCollidablemMap() {
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset images we are using
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_window_tileset = map.addTilesetImage('church staoined glass', 'stained_glass_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')

    map.createLayer('Wall Decoration', tileset)
    map.createLayer('Church roof no collision', church_roof_tileset);
    map.createLayer('Church window', church_window_tileset)
  }

  destroyElement(player, badItem) {
    this.badItems.kill();
  }
  decrementScore() {
    this.score -= 10;
    this.scoreText.setText(`Credits: ${this.score}`);
  } 

  removeItem() {
    var itemArray = this.badItems.children.getArray();
    for (let i = 0; i < this.itemArray.length; i++) {
      if (this.physics.overlap(this.player, itemArray[i])) {
        console.log(itemArray[i])
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
        console.log(itemArray[i])
        itemArray[i].destroy();
        // this.score += 5;
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
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/joystick.html', 'qrcode', 150, 150); // joystick.html
    var selfP = this;
    this.simplePeer.on("connection", function(){ // this can also be outside the update loop that is a listener on it's own
      // selfP.createCharacter();
      selfP.numberOfScans++;
      selfP.scanned = true;
      console.log("hello");

      selfP.player.setVisible(true);
      if (selfP.numberOfScans ==2 ) {
        selfP.player2.setVisible(true);
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

    onEvent ()
    {
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