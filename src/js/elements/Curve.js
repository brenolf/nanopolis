import Tile from '../objects/Tile'

const STEPS = 166

const CONTROL_POINTS = {
  'c125': [[-30, 15], [0, 30], [-30, 45]],
  'c126': [[30, 15], [0, 30], [-30, 15]],
  'c122': [[30, 45], [0, 30], [-30, 45]],
  'c124': [[30, 15], [0, 30], [30, 45]]
}

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

    const next = this._nextHeading(car.heading)

    if (next < 0) {
      return null
    }

    let points = []

    for (let i = 0; i <= 1; i += 0.005) {
      let px = CONTROL_POINTS[this.name].map(pt => pt[0] + this.x)
      let py = CONTROL_POINTS[this.name].map(pt => pt[1] + this.y)

      px = this.game.math.bezierInterpolation(px, i);
      py = this.game.math.bezierInterpolation(py, i);

      points.push({
        x: px,
        y: py
      })
    }

    return {
      points,
      next
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
