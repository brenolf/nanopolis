import GameSprite from './GameSprite'

export default class Tile extends GameSprite {
  constructor (game, x, y, z, name, direction, group) {
    super(game, x, y, z, 'roads', name, group)

    this.anchor.set(0.5, 0)

    this.game = game

    this.name = name

    this.direction = direction

    this.ORIGINAL = {
      x,
      y,
      z
    }

    this.regularizedPoint = this.game.iso.unproject({
      x: this.x,
      y: this.y
    })
  }

  hover (element) {
    const {x, y} = this.game.iso.unproject({
      x: element.x,
      y: element.y
    })

    return this.isoBounds.containsXY(x, y)
  }
}
