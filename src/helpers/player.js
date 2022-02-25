import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y)
  {
      super(scene, x, y, 'dude');

      //  You can either do this:
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setSize(28, 40);
      this.setOffset(10, 7);
      this.setCollideWorldBounds(true);
      this.setVisible(false);


      scene.physics.add.collider(this, scene.collision_layer);
      scene.physics.add.collider(this, scene.object_collision_layer);
      scene.physics.add.collider(this, scene.church_collision_layer);
      scene.physics.add.collider(this, scene.church_roof_collision_layer);
      // this.setVelocity(0, -200);
  }
}
