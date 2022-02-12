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
    this.badItems = null;
    this.player = null;
    this.beer = null;
    this.cursors = null;
    this.scoreText = null;
    this.score = 120;
 
    this.item = null;
    this.itemBounds = null;
    this.itemArray = null;
    this.beerGroup = null;
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
    this.load.spritesheet('beer', 
    'assets/beer.png',
    { frameWidth: 48, frameHeight: 48 }
  );
  this.load.image('tiktok', 'assets/tiktok.png')
  this.load.image('facebook', 'assets/facebook.png')
  this.load.image('instagram', 'assets/instagram.png')
  this.load.image('netflix', 'assets/netflix.png')
  this.load.image('youtube', 'assets/youtube.png')
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
    this.badItems = this.physics.add.group();
    this.timedItem();
    this.player = this.physics.add.sprite(100, 450, 'dude'); // loaded as sprite because it has animation frames
    this.beerGroup = this.physics.add.group();
    this.timedBeer();





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
  
  this.anims.create({
    key: 'floating',
    frames: this.anims.generateFrameNumbers('beer', { start: 0, end: 7 }),
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


    // this.physics.add.collider(this.player, this.badItems, this.removeItem, null, this);

  }

  update() {

    // this.beerGroup.playAnimation('floating');

    // this.beerGroup.iterate(beer => {
    //   beer.play('floating')
    // })

    // for (let i = 0; this.beerGroup.length; i++) {
    //   this.beerGroup.children[i].anims.play('floating', true);
    // }
    // this.beerGroup.callAll('animations.add', 'animations', 'floating', [0,1,2,3,4,5,6,7], 10, true);
    // this.beer.anims.play('floating', true);
    // this.beerGroup.getChildren().forEach(function(child) {
    //   child.anims.play('floating', true);
    // },this);
    this.itemArray = this.badItems.children.getArray()
    this.removeItem();

    if (this.score == 0) {
      alert('gameover')
    }
    
    this.scoreText.x = this.player.body.position.x;  
    this.scoreText.y = this.player.body.position.y -10;  
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
      // console.log(i);
      // console.log(this.itemArray.length)
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

  createBeerItem() {
    var randomNumber = Math.random();
    var yPosition = randomNumber < 0.5 ? 0 : 1500;
    var xPosition = randomNumber < 0.5 ? 0 : 2000;
    this.beer = this.physics.add.sprite(this.getRandomArbitraryX(), yPosition, 'beer').setScale(2); // loaded as sprite because it has animation frames
    this.beer.setBounce(1).setCollideWorldBounds(true);
    this.moveIndividual(this.beer);
    this.beer.anims.play('floating', this)
    this.beer.setSize(28, 36);
    this.beer.setOffset(10, 10);
  }


  timedItem() {
    this.timedEvent = this.time.addEvent({
      delay: 2000,
      callback: this.createBadItem,
      callbackScope: this,
      loop: true,
    })
  }

  timedBeer() {
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.createBeerItem,
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