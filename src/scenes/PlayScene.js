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
    { frameWidth: 32, frameHeight: 48 }
  );
  }

  create() {
    // this.add.image(0,0,'base_tiles')

    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset image we are using
    const tileset = map.addTilesetImage('background', 'base_tiles')
    const church_window_tileset = map.addTilesetImage('church staoined glass', 'stained_glass_tiles')
    const church_roof_tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'church_tiles')

    map.createStaticLayer('Bottom of floor', tileset)
    map.createStaticLayer('Top of floor', tileset)
    map.createStaticLayer('Wall Decoration', tileset)
    map.createStaticLayer('Outside', tileset)
    map.createStaticLayer('Furniture and trees', tileset)
    map.createStaticLayer('Church', tileset)
    map.createStaticLayer('Church roof', church_roof_tileset)
    map.createStaticLayer('Church window', church_window_tileset)
    map.createStaticLayer('Fauna and flora', tileset)


    this.player = this.physics.add.sprite(100, 450, 'dude'); // loaded as sprite because it has animation frames
    // this.scale.startFullscreen();
    // var FKey = this.input.keyboard.addKey('F');
    this.player.setCollideWorldBounds(true); // collider

        this.anims.create({
          key: 'left',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
          frameRate: 10,
          repeat: -1
      });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 4 } ],
          frameRate: 20
      });

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
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
  }

  update() {

    if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.anims.play('right', true);
    }
    else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.anims.play('left', true);
    }

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

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

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