import GameSprite from '../objects/GameSprite'

export default class Car extends GameSprite {
  constructor (game, x, y, z, heading, group) {
    super(game, x, y, 0, 'cars', 'carBlack1_006', group)

    this.game = game

    this.game.physics.isoArcade.enable(this)

    this.heading = heading
  }

  move (direction) {
    this.heading = direction || this.heading

    super.move(this.heading)
  }

  update () {
    this.game.map.tiles.forEach(tile => {
      if (!tile.hover(this)) {
        return
      }

      tile.tint = 0x994444

      switch (tile.constructor.name) {
        case 'Curve':
          const heading = tile.next(this)

          if (heading >= 0) {
            this.move(heading)
          }
        break

        case 'Target':
          this.destroy()
        break
      }
    })
  }
}
