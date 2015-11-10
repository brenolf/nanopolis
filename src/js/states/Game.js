import {World} from '../world/World';
import Grid from '../world/Grid';
import UI from '../ui/UI';
import {DIRECTION} from '../objects/GameSprite';

const BG_DATA = require('../../json/bg');

export default class Game extends World {
  create () {
    super.create();

    this.START = this.game.time.now;

    this.ui = new UI(this, BG_DATA);

    this.paused = false;

    this.game.grid = new Grid(this.game, 16, 12);
  }

  render () {
    // this.game.grid.render();
  }

  update () {
    super.update();
  }

  lost () {
  }

  won () {
  }

  pause () {
    this.paused = true;
    super.pause();
  }

  resume () {
    this.paused = false;
    super.resume();
  }
}
