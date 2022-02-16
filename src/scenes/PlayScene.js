import Phaser from "phaser";
import "smartcontroller";

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

    // items
    this.badItems = null;
    this.player = null;
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

  create() {
    if (this.globalFlag == false) {
      this.createCode();
      this.globalFlag = true;
    }

    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset images we are using
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_window_tileset = map.addTilesetImage('church staoined glass', 'stained_glass_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')

    map.createStaticLayer('Bottom of floor', tileset)
    map.createStaticLayer('Top of floor', tileset)
    map.createStaticLayer('Fauna and flora', tileset)
    this.badItems = this.physics.add.group();
    this.timedItem();
    // this.player = this.physics.add.sprite(100, 450, 'dude'); // loaded as sprite because it has animation frames
    // this.playerList.push(this.player);
    this.beerGroup = this.physics.add.group();
    this.createBeerItem();
    this.timedBeer();
    this.goodItems = this.physics.add.group();
    this.timedGoodItem();

    // this.player.setSize(28, 40);
    // this.player.setOffset(10, 7);


    map.createStaticLayer('Wall Decoration', tileset)
    this.collision_layer = map.createStaticLayer('Outside', tileset)
    this.object_collision_layer = map.createStaticLayer('Furniture and trees', tileset)
    this.church_collision_layer = map.createStaticLayer('Church', tileset)
    this.church_roof_collision_layer = map.createStaticLayer('Church roof', church_roof_tileset)
    map.createStaticLayer('Church roof no collision', church_roof_tileset);
    map.createStaticLayer('Church window', church_window_tileset)


        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 14 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 1 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 26 }),
          frameRate: 10,
          repeat: -1
      });
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 36, end: 38 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'floating',
        frames: this.anims.generateFrameNumbers('beer', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
      });


    // this.cursors = this.input.keyboard.createCursorKeys();
    this.scale.displaySize.setAspectRatio( this.width/this.height );
    this.scale.refresh();
    // if (this.globalFlag == false) {
    //   this.createCode();
    //   this.globalFlag = true;
    // }

    this.collision_layer.setCollisionByExclusion([-1]);
    // this.physics.add.collider(this.player, collision_layer);
    this.object_collision_layer.setCollisionByExclusion([-1]);
    // this.physics.add.collider(this.player, object_collision_layer);
    this.church_collision_layer.setCollisionByExclusion([-1]);
    // this.physics.add.collider(this.player, church_collision_layer);
    this.church_roof_collision_layer.setCollisionByExclusion([-1]);
    // this.physics.add.collider(this.player, church_roof_collision_layer);

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

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 1 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 26 }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('dude', { start: 36, end: 38 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });

    this.itemArray = this.badItems.children.getArray();
    this.beerGroupArray = this.beerGroup.children.getArray();
    if (this.scanned == true) {
      this.removeItem();
      this.removeBeerSprite();
      this.removeGoodItem();

      this.scoreText.x = this.player.body.position.x;  
      this.scoreText.y = this.player.body.position.y -10;  
      // if (this.cursors.right.isDown) {
      //   this.player.body.velocity.x = this.playerVelocity;
      //   this.player.anims.play('right', true);
      // }
      // else if (this.cursors.left.isDown) {
      //   this.player.body.velocity.x = -this.playerVelocity;
      //   this.player.anims.play('left', true);
      // }
      // else if (this.cursors.up.isDown) {
      //   this.player.body.velocity.y = -this.playerVelocity;
      //   this.player.anims.play('up', true);
      // }
      // else if (this.cursors.down.isDown) {
      //   this.player.body.velocity.y = this.playerVelocity;
      //   this.player.anims.play('down', true);
      // }
      // else {
      //   this.player.body.velocity.y = 0;
      //   this.player.body.velocity.x = 0;
      //   this.player.anims.play('turn', true);
      // }
  


      if (this.score <= 0) {
        alert('gameover')
      }
    
      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(controllerList).length;
      var joystickController = controllerList[Object.keys(controllerList)[0]]
      // console.log(this.controller.isActive);
      if (joystickController.isActive && !null) {
        var direction = joystickController.state.direction.angle;
          console.log(joystickController.state.direction.angle);
        if (direction == 'right') {
          this.player.body.velocity.x = this.playerVelocity;
          this.player.anims.play('right', true);
        }
        else if (direction == 'left') {
          this.player.body.velocity.x = -this.playerVelocity;
          this.player.anims.play('left', true);
        }
        else if (direction == 'up') {
          this.player.body.velocity.y = -this.playerVelocity;
          this.player.anims.play('up', true);
        }
        else if (direction == 'down') {
          this.player.body.velocity.y = this.playerVelocity;
          this.player.anims.play('down', true);
        }
        else {
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.anims.play('turn', true);
        }
      }
      else {
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        this.player.anims.play('turn', true);
      }

      // for (let i = 0; i < size; i++) {
      //   // console.log(this.playerList[i].text);
      //   if (controllerList[Object.keys(controllerList)[i]].buttons['up'] == true && i == 0) {
      //     console.log("up pressed")
      //     this.player.body.velocity.y = -this.playerVelocity;
      //     this.player.anims.play('up', true);
      //   } 
      //   else if (controllerList[Object.keys(controllerList)[i]].buttons['left'] == true && i == 0) {
      //     this.player.body.velocity.x = -this.playerVelocity;
      //     this.player.anims.play('left', true);
      //   } 
      //   else if (controllerList[Object.keys(controllerList)[i]].buttons['right'] == true && i == 0) {
      //     this.player.body.velocity.x = this.playerVelocity;
      //     this.player.anims.play('right', true);
      //   } 
      //   else if (controllerList[Object.keys(controllerList)[i]].buttons['down'] == true && i == 0) {
      //     this.player.body.velocity.y = this.playerVelocity;
      //     this.player.anims.play('down', true);
      //   } 
      //   else {
      //     this.player.body.velocity.y = 0;
      //     this.player.body.velocity.x = 0;
      //     this.player.anims.play('turn', true);
      //   }
      // }
    }
  }

  destroyElement(player, badItem) {
    this.badItems.kill();
  }
  decrementScore() {
    this.score -= 10;
    this.scoreText.setText(`Credits: ${this.score}`);
    // this.item.destroy();
  } 

  removeItem() {
    var itemArray = this.badItems.children.getArray();
    for (let i = 0; i < this.itemArray.length; i++) {
      var boundsB = this.itemArray[i].getBounds();
      var boundsA = this.player.getBounds();
      if (this.physics.overlap(this.player, itemArray[i])) {
        console.log(itemArray[i])
        itemArray[i].destroy();
        this.score -= 10;
        this.scoreText.setText(`Credits: ${this.score}`);
      }
      // if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA + 0.1, boundsB +0.1)) {
      //   console.log(i);
      //   this.itemArray[i].destroy();
      // }
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
        this.score += 5;
        this.scoreText.setText(`Credits: ${this.score}`);
      }
      // if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA + 0.1, boundsB +0.1)) {
      //   console.log(i);
      //   this.itemArray[i].destroy();
      // }
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
        this.playerVelocity -= 100;
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
    var randomNumber = Math.random();
    var yPosition = randomNumber < 0.5 ? 0 : 1500;
    this.beer = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beer2 = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beer3 = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beer4 = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beer5 = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beerGroup.add(this.beer);
    this.beerGroup.add(this.beer2);
    this.beerGroup.add(this.beer3);
    this.beerGroup.add(this.beer4);
    this.beerGroup.add(this.beer5);
  }

  createIndividualBeer() {
    var arr = this.beerGroup.children.getArray();
    this.playerVelocity= 200;

    for (let k = 0; k < 5; k++) {
      console.log(k);
      if (k == this.index && this.index == 0) {
        this.beer.setBounce(1).setCollideWorldBounds(true);
        this.moveIndividualBeer(this.beer);
        this.beer.anims.play('floating', this)
        this.beer.setSize(28, 36);
        this.beer.setOffset(10, 10);
      }
      else if (k == this.index && this.index == 1) {
        this.beer2.setBounce(1).setCollideWorldBounds(true);
        this.moveIndividualBeer(this.beer2);
        this.beer2.anims.play('floating', this)
        this.beer2.setSize(28, 36);
        this.beer2.setOffset(10, 10);
      }
      else if (k == this.index && this.index == 2) {
        this.beer3.setBounce(1).setCollideWorldBounds(true);
        this.moveIndividualBeer(this.beer3);
        this.beer3.anims.play('floating', this)
        this.beer3.setSize(28, 36);
        this.beer3.setOffset(10, 10);
      }
      else if (k == this.index && this.index == 3) {
        this.beer4.setBounce(1).setCollideWorldBounds(true);
        this.moveIndividualBeer(this.beer4);
        this.beer4.anims.play('floating', this)
        this.beer4.setSize(28, 36);
        this.beer4.setOffset(10, 10);
      }
      else if (k == this.index && this.index == 4) {
        this.beer5.setBounce(1).setCollideWorldBounds(true);
        this.moveIndividualBeer(this.beer5);
        this.beer5.anims.play('floating', this)
        this.beer5.setSize(28, 36);
        this.beer5.setOffset(10, 10);
      }
    }
    this.index += 1;
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
      callback: this.createIndividualBeer,
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
    this.player = this.physics.add.sprite(100, 450, 'dude'); // loaded as sprite because it has animation frames
    this.playerList.push(this.player);
    this.player.setSize(28, 40);
    this.player.setOffset(10, 7);
    this.player.setCollideWorldBounds(true); // collider
    this.physics.add.collider(this.player, this.collision_layer);
    this.physics.add.collider(this.player, this.object_collision_layer);
    this.physics.add.collider(this.player, this.church_collision_layer);
    this.physics.add.collider(this.player, this.church_roof_collision_layer);

  //   this.anims.create({
  //     key: 'left',
  //     frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 14 }),
  //     frameRate: 10,
  //     repeat: -1
  // });

  // this.anims.create({
  //     key: 'turn',
  //     frames: [ { key: 'dude', frame: 1 } ],
  //     frameRate: 20
  // });

  // this.anims.create({
  //     key: 'right',
  //     frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 26 }),
  //     frameRate: 10,
  //     repeat: -1
  // });
  // this.anims.create({
  //   key: 'up',
  //   frames: this.anims.generateFrameNumbers('dude', { start: 36, end: 38 }),
  //   frameRate: 10,
  //   repeat: -1
  // });
  // this.anims.create({
  //   key: 'down',
  //   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
  //   frameRate: 10,
  //   repeat: -1
  // });

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
  }

  createCode() {
    // this.scene.pause();
    // this.physics.pause();
    // this.isPaused = true;
    this.simplePeer = new smartcontroller.JoystickSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/joystick.html', 'qrcode', 150, 150, '1'); // joystick.html
    var selfP = this;
    this.simplePeer.on("connection", function(){ // this can also be outside the update loop that is a listener on it's own
      selfP.createCharacter();
      selfP.scanned = true;
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
}

export default PlayScene;