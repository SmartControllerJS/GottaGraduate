import Phaser from "phaser";

export class Beer extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y)
  {
    super(scene, x, y, 'beer')
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.beerGroup.add(this);

    this.setScale(2);
    this.setBounce(1);
    this.setCollideWorldBounds(true);
    scene.moveIndividualBeer(this);
    this.setSize(28, 36);
    this.setOffset(10, 10);
  }
}
