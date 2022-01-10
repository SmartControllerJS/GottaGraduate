import BaseScene from './BaseScene';

class ScoreScene extends BaseScene {

  constructor(config) {
    super('ScoreScene', config);

  }

  // can use any function from basescene using super.class()
  create() {
    super.create();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5);
  }

}

export default ScoreScene;