import Tile from '../objects/Tile'

const HORIZONTAL = 0
const VERTICAL = 1

const ROADS = {
  'c081': VERTICAL,
  'c073': HORIZONTAL,
  'l082': VERTICAL,
  'l074': HORIZONTAL
}

export default class Road extends Tile {
  constructor (game, x, y, z, name, group) {
    super(game, x, y, z, name, ROADS[name], group)
  }

  nextHeading (heading) {
    switch (heading) {
      case DIRECTION.DOWN:
      case DIRECTION.UP:
        if (this.direction === VERTICAL) {
          return heading
        }
      break

      default:
        if (this.direction === HORIZONTAL) {
          return heading
        }
    }

    return -1
  }
}
