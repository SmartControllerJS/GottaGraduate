import Phaser from "phaser";
import PlayScene from "./PlayScene";
import { Player } from "../helpers/player.js";

class GameoverScene extends Phaser.Scene {

  constructor(config) {
    super('GameoverScene');
    this.config = config;

    this.gameoverText = null;
    this.scoreText = null;
    this.playerList = [];
  }

  init(data) {
    this.score1 = data.score1;
    this.controllerList = data.controllerList;
    this.playerList = data.players;
  }

  preload() {
    this.load.spritesheet('dude', 
      'assets/dude.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.image('player1', 'assets/player1.PNG');
  }

  create() {
    this.add.image(600, 200, 'player1');
    console.log(this.score1);
    console.log(this.controllerList);
    console.log(this.playerList);
    var style = {font: "64px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};

    this.gameoverText = this.add.text(370,20, 'GAMEOVER', {font: "bold 100px Arial", fill: '#FF0000'});
    this.scoreText = this.add.text(400,110, 'SCORES', style);
    this.player1ScoreText = this.add.text(400,200, 'Player 1 Score' + this.score1, style);
    this.gameoverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    this.time.addEvent({
      delay: 20000,
      callback: this.reloadOnStart,
      callbackScope: this,
      loop: false
    })
  }

  // createCharacters() {
  //   this.player = new Player(this, 100, 200);
  //   this.player2 = new Player(this, 200, 200);
  //   this.player3 = new Player(this, 300, 200);
  //   this.player4 = new Player(this, 400, 200);
  // }

  update() {

  }

  checkScores() {
   
    
  }


  reloadOnStart() {
    if (window.localStorage) {
      if (!localStorage.getItem('reload')) {
        localStorage['reload'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('reload');
      }
    }
  }
}

export default GameoverScene;