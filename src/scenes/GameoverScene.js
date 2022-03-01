import Phaser from "phaser";

var style = {font: "64px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
class GameoverScene extends Phaser.Scene {

  constructor(config) {
    super('GameoverScene');
    this.config = config;

    this.gameoverText = null;
    this.scoreText = null;
    this.playerList = [];
  }

  init(data) {
    this.scores = data.scores;
    this.controllerList = data.controllerList;
    this.playerList = data.players;
    this.numberOfPlayers = data.numberOfPlayers;
  }

  preload() {
    this.load.image('player1', 'assets/player1.PNG');
  }

  create() {
    this.add.image(600, 200, 'player1');
    console.log(this.scores[0]);



    this.scoreText = this.add.text(this.config.width/2 - 150,this.config.height/2 - 300, 'SCORES', style).setOrigin(0,0);
    // this.player1ScoreText = this.add.text(this.scoreText.width,200, 'Player 1 Score: ' + this.scores[0], style);
    this.createScoreText();

    this.time.addEvent({
      delay: 20000,
      callback: this.reloadOnStart,
      callbackScope: this,
      loop: false
    })
  }

  update() {

  }

  createScoreText() {
    // only for the number of players
    var height = 0;
    var max = 0;
    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (max < this.scores[i]) {
        max = this.scores[i];
      }
      this.add.text(this.scoreText.width+ 50,200 + height, 'Player ' + (i + 1) + ' Score: ' + this.scores[0], style);
      height += 100
    }
    this.add.text(this.scoreText.width + 50)
  }

  checkScores() {
    // check highest score from all scores in this.scores
    var max = 0;
    for (let i = 0; i < this.scores.length; i++) {
      if (max < this.scores[i]) {
        max = this.scores[i];
      }
      console.log
    }
    
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