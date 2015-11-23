import GameSprite from '../objects/GameSprite'

export default class Car extends GameSprite {
  constructor (game, x, y, z, heading, group) {
    super(game, x, y, 0, 'cars', 'carBlack1_006', group)

    this.game = game

    this.game.physics.isoArcade.enable(this)

    this.heading = heading

    this.lastCommand = null

    this.path = null
  }

  move (direction) {
    this.heading = direction || this.heading

    if (this.path === null) {
      return super.move(this.heading)
    }

    this.stop()

    const {x, y} = this.game.iso.unproject(this.path.points.shift())

    this.body.x = x
    this.body.y = y

    if (this.path.points.length === 0) {
      this.heading = this.path.next
      super.move(this.heading)
      this.path = null
    }
  }

  update () {
    if (this.path !== null) {
      this.move()
    }

    this.game.map.tiles.forEach(tile => {
      if (!tile.hover(this) || this.lastCommand === tile) {
        return
      }

      tile.tint = 0x994444

      switch (tile.constructor.name) {
        case 'Curve':
          this.path = tile.next(this)
          this.lastCommand = tile
        break

        case 'Target':
          this.destroy()
        break
      }
    })
  }
}
