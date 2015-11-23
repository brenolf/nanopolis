import GameSprite from '../objects/GameSprite'

export default class Car extends GameSprite {
  constructor (game, x, y, z, heading, group) {
    super(game, x, y, 0, 'cars', 'carBlack1_006', group)

    this.game = game

    this.game.physics.isoArcade.enable(this)

    this.body.collideWorldBounds = true

    this.heading = heading
  }

  move () {
    super.move(this.heading)
  }

  update () {
    this._overlap()
  }

  _overlap () {
    const projection = this.game.iso.unproject({
      x: this.x,
      y: this.y
    })

    this.game.map.tiles.forEach(tile => {
      if (tile.isoBounds.containsXY(projection.x, projection.y)) {
        tile.tint = 0x86bfda

        if (tile.curve) {
          console.log(this.heading, tile.curve)
        }
      }
    })
  }
}
