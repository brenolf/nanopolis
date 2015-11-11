import GameSprite from '../objects/GameSprite'

export default class Car extends GameSprite {
  constructor (game, x, y, z, group) {
    super(game, x, y, z, 'cars', 'carBlack1_006.png', group);

    this.cursors = game.input.keyboard.createCursorKeys();

    game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN
    ]);

    // game.physics.isoArcade.enable(this);
  }

  update () {
    if (this.cursors.up.isDown) {
      super.move(0)
    }

    else if (this.cursors.right.isDown) {
      super.move(1)
    }

    else if (this.cursors.down.isDown) {
      super.move(2)
    }

    else if (this.cursors.left.isDown) {
      super.move(3)
    }

    else {
      super.move(null)
    }
  }
}
