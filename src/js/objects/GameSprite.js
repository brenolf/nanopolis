const TIME = 1000;

const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

const SPEED = 30;

export default class GameSprite extends Phaser.Plugin.Isometric.IsoSprite {
  constructor (game, x, y, z, key, frame, group) {
    // let real = game.grid.real(x, y, z);

    let real = {x,y,z};

    group = group || game.world;

    super(game, real.x, real.y, real.z, key, frame);

    this.TILE = {
      x: x,
      y: y
    };

    this.anchor.set(0.5);

    // this.moving = false;

    this.animation = null;

    let element = group.addChild(this);

    game.physics.isoArcade.enable(element);
  }

  stop () {
    // this.moving = false;
  }

  move (direction) {
    // if (this._checkBounds(direction) === false) {
    //   this.animation = null;
    //   return false;
    // }

    // this.moving = true;

    switch (direction) {
      case DIRECTION.UP:
        this.body.velocity.y = -SPEED;
      break;

      case DIRECTION.RIGHT:
        this.body.velocity.x = SPEED;
      break;

      case DIRECTION.DOWN:
        this.body.velocity.y = SPEED;
      break;

      case DIRECTION.LEFT:
        this.body.velocity.x = -SPEED;
      break;

      default:
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }

    // let target = this.game.grid.real(this.TILE.x, this.TILE.y);
    //
    // let movingTween = this.game.add.tween(this).to(target, TIME);
    // movingTween.onComplete.add(this.stop, this);
    //
    // if (this.animation) {
    //   this.animation.chain(movingTween);
    // } else {
    //   movingTween.start();
    // }
    //
    // this.animation = movingTween;

    return true;
  }

  _checkBounds (face) {
    const constraints = [
      0,
      this.game.grid.columns - 1,
      this.game.grid.rows - 1,
      0
    ];

    let result = true;

    constraints.forEach((constraint, direction) => {
      let block = (direction % 2 === 0) ? 'y' : 'x';

      if (face === direction && this.TILE[block] === constraint) {
        result = false;
      }
    });

    return result;
  }
}
