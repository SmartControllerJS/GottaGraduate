import Phaser from "phaser";

var style = {font: "64px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"};
var style2 = {font: "20px Arial", fill: "#808080"};
class GameoverScene extends Phaser.Scene {

  constructor(config) {
    super('GameoverScene');
    this.config = config;

    this.scoreText = null;
    this.max = 0;
    this.playerImages = ['player1', 'player2', 'player3', 'player4']
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
    this.scoreText = this.add.text(this.config.width/2 - 170,this.config.height/2 - 200, 'CREDITS', style).setOrigin(0,0);
    this.add.text(this.config.width/2 - 250,this.config.height/2 - 250, 'Thank you for playing Gotta Graduate!', { font: "24px Arial", fill: "#00FFFF" }).setOrigin(0,0);

    this.createScoreText();
    this.saveBestScore();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(this.config.width/2 - 350, this.config.height/2 - 320, `All-time Highscore: ${bestScore}`, { font: "64px Arial", fill: "#ffff00" });

    this.timedReload();
  }

  update() {

  }

  createScoreText() {

    var height = 60;

    for (let i = 0; i < this.numberOfPlayers; i++) {
      if (this.max < this.scores[i]) {
        this.max = this.scores[i];
      }
      if (i == 0) {
        this.player1ScoreText = this.add.text(this.scoreText.width + 200,200 + height, 'Credits: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player1');
      }
      else if (i == 1) {
        this.player2ScoreText = this.add.text(this.scoreText.width + 200,200 + height, 'Credits: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player2');
      }
      else if (i == 2) {
        this.player3ScoreText = this.add.text(this.scoreText.width + 200,200 + height, 'Credits: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player3');
      }
      else if (i == 3) {
        this.player4ScoreText = this.add.text(this.scoreText.width + 200,200 + height, 'Credits: ' + this.scores[i], style);
        this.add.text(this.scoreText.width + 115, 165 + height, 'Player ' + (i + 1), {font: "20px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle"});
        this.add.image(this.scoreText.width + 150, 230 + height, 'player4');
      }
      height += 150
    }
    for (let i=0; i < this.numberOfPlayers; i++) {
      if (this.max == this.scores[i]) {
        if (i == 0) {
          this.player1ScoreText.setText('Credits: ' + this.scores[i] + ' - WINNER')
          this.player1ScoreText.setColor('green');
        }
        else if (i == 1) {
          this.player2ScoreText.setText('Credits: ' + this.scores[i] + ' - WINNER')
          this.player2ScoreText.setColor('green');
        }
        else if (i == 2) {
          this.player3ScoreText.setText('Credits: ' + this.scores[i] + ' - WINNER')
          this.player3ScoreText.setColor('green');
        }
        else if (i ==3) {
          this.player4ScoreText.setText('Credits: ' + this.scores[i] + ' - WINNER')
          this.player4ScoreText.setColor('green');
        }
      }
    }

    var playerTexts = [this.player1ScoreText, this.player2ScoreText, this.player3ScoreText, this.player4ScoreText]
    var height2 = 60;
    for (let i =0; i < this.numberOfPlayers; i++) {
      if (this.scores[i] < 0) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Looks like you dropped out', style2)
      }
      else if (this.scores[i] > 0 && this.scores[i] <=120) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Looks like you must be a first year...', style2)
      }
      else if (this.scores[i] > 120 && this.scores[i] <=240) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Looks like you must be a second year...', style2)
      }
      else if (this.scores[i] > 240 && this.scores[i] <=360) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Looks like you must be a third year...', style2)
      }
      else if (this.scores[i] > 360 && this.scores[i] <=480) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Looks like you must be a fourth year...', style2)
      }
      else if (this.scores[i] > 480) {
        this.add.text(playerTexts[i].width - 180, 165 + height2, 'Are you some kind of genius?', style2)
      }
      height2 += 150;
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