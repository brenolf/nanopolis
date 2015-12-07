import Tile from '../objects/Tile'

const CONTROL_POINTS = {
  'c125': [[-30, 15], [0, 30], [-30, 45]],
  'c126': [[30, 15], [0, 30], [-30, 15]],
  'c122': [[30, 45], [0, 30], [-30, 45]],
  'c124': [[30, 15], [0, 30], [30, 45]],
  'l123': [[30, 45], [0, 30], [-30, 45]],
  'l125': [[30, 15], [0, 30], [30, 45]],
  'l126': [[-30, 15], [0, 30], [-30, 45]],
  'l127': [[30, 15], [0, 30], [-30, 15]],
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
        [DIRECTION.LEFT, DIRECTION.UP]
      ],
      'l126': [
        [DIRECTION.RIGHT, DIRECTION.DOWN],
        [DIRECTION.UP, DIRECTION.LEFT]
      ],
      'l127': [
        [DIRECTION.DOWN, DIRECTION.LEFT],
        [DIRECTION.RIGHT, DIRECTION.UP]
      ],
      'l123': [
        [DIRECTION.LEFT, DIRECTION.DOWN],
        [DIRECTION.UP, DIRECTION.RIGHT]
      ],
      'l125': [
        [DIRECTION.DOWN, DIRECTION.RIGHT],
        [DIRECTION.LEFT, DIRECTION.UP]
      ]
    }

    CURVES.l126 = CURVES.c125
    CURVES.l127 = CURVES.c126
    CURVES.l123 = CURVES.c122
    CURVES.l125 = CURVES.c124

    super(game, x, y, z, name, CURVES[name], group)

    this.bezier = []

    for (let i = 0; i <= 1; i += 0.005) {
      let p = {
        x: CONTROL_POINTS[this.name].map(pt => pt[0] + this.x),
        y: CONTROL_POINTS[this.name].map(pt => pt[1] + this.y)
      }

      p.x = this.game.math.bezierInterpolation(p.x, i)
      p.y = this.game.math.bezierInterpolation(p.y, i)

      this.bezier.push({
        x: p.x,
        y: p.y
      })
    }
  }

  getPath (heading) {
    const index = this._nextHeading(heading)

    if (index < 0) {
      return null
    }

    const next = this.direction[index][1]

    return {
      points: (index === 1) ? this.bezier.slice().reverse() : this.bezier.slice(),
      next
    }
  }

  _nextHeading (heading) {
    if (this.direction[0][0] === heading) {
      return 0
    }

    if (this.direction[1][0] === heading) {
      return 1
    }

    return -1
  }
}
