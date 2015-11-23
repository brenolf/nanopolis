import Tile from '../objects/Tile'

const HALF_SIZE = require('../../json/game.json').tileSize / 2

export default class Curve extends Tile {
  constructor (game, x, y, z, name, group) {
    const CURVES = {
      'c125': [
        [DIRECTION.RIGHT, DIRECTION.DOWN],
        [DIRECTION.UP, DIRECTION.LEFT]
      ],
      'c126': [
        [DIRECTION.DOWN, DIRECTION.LEFT],
        [DIRECTION.RIGHT, DIRECTION.UP]
      ],
      'c122': [
        [DIRECTION.LEFT, DIRECTION.DOWN],
        [DIRECTION.UP, DIRECTION.RIGHT]
      ],
      'c124': [
        [DIRECTION.DOWN, DIRECTION.RIGHT],
        [DIRECTION.UP, DIRECTION.LEFT]
      ]
    }

    super(game, x, y, z, name, CURVES[name], group)
  }

  next (car) {
    const heading = car.heading

    const next = this._nextHeading(heading)

    if (next < 0) {
      return next
    }

    const {x, y} = this.game.iso.unproject({
      x: car.x,
      y: car.y
    })

    const diff = {
      x: Math.floor(Math.abs(this.regularizedPoint.x - x)),
      y: Math.floor(Math.abs(this.regularizedPoint.y - y))
    }

    const diff2 = {
      x: Math.floor(Math.abs(this.x - car.x)),
      y: Math.floor(Math.abs(this.y - car.y))
    }

    const moving = {
      horizontally: (heading === DIRECTION.RIGHT || heading === DIRECTION.LEFT),
      vertically: (heading === DIRECTION.UP || heading === DIRECTION.DOWN)
    }

    if (this.name === 'c122' || this.name === 'c124') {
      if (diff.x >= 24 && diff.x >= 24) {
        return next
      }
    } else {
      if (diff.x >= 24 && diff.y >= 35) {
        return next
      }
    }
  }

  _nextHeading (heading) {
    if (this.direction[0][0] === heading) {
      return this.direction[0][1]
    }

    if (this.direction[1][0] === heading) {
      return this.direction[1][1]
    }

    return -1
  }
}
