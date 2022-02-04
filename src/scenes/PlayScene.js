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

  }

  preload() {
    // this.load.image('sky', 'assets/sky.png');
    this.load.image('base_tiles', 'assets/base_tiles.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/base_tiles.json')
  }

  create() {
    // this.add.image(0,0,'base_tiles')

    // create the Tilemap
    const map = this.make.tilemap({ key: 'tilemap' })

    // add the tileset image we are using
    const tileset = map.addTilesetImage('hyptosis_tile-art-batch-1', 'base_tiles')

    map.createStaticLayer('Tile Layer 1', tileset)

    // this.scale.startFullscreen();
    // var FKey = this.input.keyboard.addKey('F');

    // FKey.on('down', function () {
    //   if (this.scale.isFullscreen) {
    //     this.scale.stopFullscreen();
    //   }
    //   else {
    //     this.scale.startFullscreen();
    //   }
    // }, this);

    this.scale.displaySize.setAspectRatio( this.width/this.height );
    this.scale.refresh();
    // this.createBG();
    // if (this.globalFlag == false) {
    //   this.createCode();
    //   this.globalFlag = true;
    // }
  }

  update() {


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