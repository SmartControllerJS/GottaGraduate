import Phaser from "phaser";

var style = {font: "64px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
class GameoverScene extends Phaser.Scene {

  constructor(config) {
    super('GameoverScene');
    this.config = config;

    this.scoreText = null;
    this.max = 0;
  }

  init(data) {
    this.scores = data.scores;
    this.numberOfPlayers = data.numberOfPlayers;
  }

  preload() {
    this.load.image('player1', 'assets/player1.PNG');
    this.load.image('player2', 'assets/player2.PNG');
    this.load.image('player3', 'assets/player3.PNG');
    this.load.image('player4', 'assets/player4.PNG');
  }

  create() {
    this.scoreText = this.add.text(this.config.width/2 - 150,this.config.height/2 - 300, 'SCORES', style).setOrigin(0,0);

    this.createScoreText();
    this.saveBestScore();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(this.config.width/2 + 150, this.config.height/2 - 300, `Best score: ${bestScore}`, style);

    this.timedReload();
  }

  update() {

  }

  createScoreText() {

    var height = 0;

    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (this.max < this.scores[i]) {
        this.max = this.scores[i];
      }
      if (i == 0) {
        this.add.text(this.scoreText.width + 200,200 + height, 'Score: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player1');
      }
      else if (i == 1) {
        this.add.text(this.scoreText.width + 200,200 + height, 'Score: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player2');
      }
      else if (i == 2) {
        this.add.text(this.scoreText.width + 200,200 + height, 'Score: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player3');
      }
      else if (i == 3) {
        this.add.text(this.scoreText.width + 200,200 + height, 'Score: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player4');
      }
      height += 150
    }
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    if (!bestScore || this.max > bestScore) {
      localStorage.setItem('bestScore', this.max);
    }
  }

  timedReload() {
    this.time.addEvent({
      delay: 20000,
      callback: this.reloadOnStart,
      callbackScope: this,
      loop: false
    })
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