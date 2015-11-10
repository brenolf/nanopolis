const TIME = 1000;

export const DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
};

export class GameSprite extends Phaser.Sprite {
  constructor (game, x, y, key, frame, group) {
    let real = game.grid.real(x, y);

    key = key || `${game.GAME_DATA.name}.sprites`;

    group = group || game.world;

    super(game, real.x, real.y, key, frame);

    this.TILE = {
      x: x,
      y: y
    };

    this.moving = false;

    this.animation = null;

    group.addChild(this);
  }

  stop () {
    this.moving = false;
  }

  move (direction) {
    if (this._checkBounds(direction) === false) {
      this.animation = null;
      return false;
    }

    this.moving = true;

    switch (direction) {
      case DIRECTION.UP:
        this.TILE.y--;
      break;

      case DIRECTION.RIGHT:
        this.TILE.x++;
      break;

      case DIRECTION.DOWN:
        this.TILE.y++;
      break;

      case DIRECTION.LEFT:
        this.TILE.x--;
      break;
    }

    let target = this.game.grid.real(this.TILE.x, this.TILE.y);

    let movingTween = this.game.add.tween(this).to(target, TIME);
    movingTween.onComplete.add(this.stop, this);

    if (this.animation) {
      this.animation.chain(movingTween);
    } else {
      movingTween.start();
    }

    this.animation = movingTween;

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
