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
    const {x, y} = this.game.iso.unproject({
      x: car.x,
      y: car.y
    })

    const diff = {
      x: Math.floor(Math.abs(this.regularizedPoint.x - x)),
      y: Math.floor(Math.abs(this.regularizedPoint.y - y))
    }

    const allowed = {
      'c125': [24, 35, 1],
      'c126': [24, 35, 1],
      'c122': [20, 40, -1],
      'c124': [17, 28, 1]
    }

    const K = allowed[this.name]

    if (K[2] * diff.x >= K[2] * K[0] && K[2] * diff.y >= K[2] * K[1]) {
      return this._nextHeading(car.heading)
    }

    return -1
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
