import Phaser from "phaser";
// import 'smartcontroller';

// all commented code is smartcontroller specific - not game specific

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;

    this.player = null;
    this.cursors = null;
  }

  preload() {
    // this.load.image('sky', 'assets/sky.png');

    this.load.image('base_tiles', 'assets/base_tiles.png')
    this.load.image('church_tiles', 'assets/church_tiles.png')
    this.load.image('stained_glass_tiles', 'assets/stained_glass_tiles.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/base_tiles.json')
    this.load.spritesheet('dude', 
    'assets/dude.png',
    { frameWidth: 48, frameHeight: 48 }
  );
  this.load.image('bird', 'assets/bird.png')
  }

  create() {
    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset images we are using
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_window_tileset = map.addTilesetImage('church staoined glass', 'stained_glass_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')

    map.createStaticLayer('Bottom of floor', tileset)
    map.createStaticLayer('Top of floor', tileset)
    map.createStaticLayer('Fauna and flora', tileset)
    this.player = this.physics.add.sprite(100, 450, 'dude'); // loaded as sprite because it has animation frames
    
    this.timedItem();

    this.badItems = this.physics.add.group();


    map.createStaticLayer('Wall Decoration', tileset)
    var collision_layer = map.createStaticLayer('Outside', tileset)

    var object_collision_layer = map.createStaticLayer('Furniture and trees', tileset)
    var church_collision_layer = map.createStaticLayer('Church', tileset)
    var church_roof_collision_layer = map.createStaticLayer('Church roof', church_roof_tileset)
    map.createStaticLayer('Church roof no collision', church_roof_tileset);
    map.createStaticLayer('Church window', church_window_tileset)

    this.player.setCollideWorldBounds(true); // collider
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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.scale.displaySize.setAspectRatio( this.width/this.height );
    this.scale.refresh();
    // this.createBG();
    // if (this.globalFlag == false) {
    //   this.createCode();
    //   this.globalFlag = true;
    // }

    collision_layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, collision_layer);
    object_collision_layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, object_collision_layer);
    church_collision_layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, church_collision_layer);
    church_roof_collision_layer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, church_roof_collision_layer);
  }

  update() {
    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 200;
      this.player.anims.play('right', true);
    }
    else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -200;
      this.player.anims.play('left', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -200;
      this.player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.body.velocity.y = 200;
      this.player.anims.play('down', true);
    }
    else {
      this.player.body.velocity.y = 0;
      this.player.body.velocity.x = 0;
      this.player.anims.play('turn', true);
    }
    // this.game.physics.arcade.collide(player, "Outside");
    // if (this.scanned == true) {
    //   var controllerList = this.simplePeer.controllerList;
    //   var size = Object.keys(this.simplePeer.controllerList).length;
    //   for (let i = 0; i < size; i++) {
    //     console.log(this.playerList[i].text);
    //     if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 0) {
    //       this.bird.body.velocity.y = -this.flapVelocity;
    //     } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 1) {
    //       this.secondBird.body.velocity.y = -this.flapVelocity;
    //     } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 2) {
    //       this.thirdBird.body.velocity.y = -this.flapVelocity;
    //     }
    //   }
    // }
  }

  getRandomArbitrary() {
    return Math.random() * (0 - 700) + 720;
  }

  createBadItem() {
    var xPosition = Math.random() < 0.5 ? 0 : 2000;
    var item = this.badItems.create(xPosition, this.getRandomArbitrary(), 'bird');
    item.setBounce(1).setCollideWorldBounds(true);
    this.moveIndividual(item);
  }

  timedItem() {
    this.timedEvent = this.time.addEvent({
      delay: 4000,
      callback: this.createBadItem,
      callbackScope: this,
      loop: true,
    })
  }

  moveIndividual(item) {
    item.setVelocity(Phaser.Math.Between(10, 300), Phaser.Math.Between(10, 300));
  }

  // createBG() {
  //   this.add.image(0, 0, 'sky').setOrigin(0, 0);
  // }

  // createCode() {
  //   this.simplePeer = new smartcontroller.NesSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
  //   this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/nesController.html', 'qrcode', 150, 150, '1');
  //   var selfP = this;
  //   this.simplePeer.on("connection", function(nes){ // this can also be outside the update loop that is a listener on it's own
  //     this.controller = nes; 
  //     selfP.scanned = true;
  //   })
  // }
}

export default PlayScene;