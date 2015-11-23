import Tile from '../objects/Tile'
import Source from '../elements/Source'
import Target from '../elements/Target'
import Curve from '../elements/Curve'

const MAPS = require('../../json/maps.json')
const SIZE = require('../../json/game.json').tileSize

//              [ N,  E,  S,  W]
const SOURCES = [41, 33, 26, 34]
const TARGETS = [25, 18, 13, 19]

const CURVES = [122, 124, 125, 126]

export default class Map {
  constructor (index, game) {
    this.map = MAPS[index]

    this.bounds = {
      w: this.map[0].length,
      h: this.map.length
    }

    this.tiles = game.add.group()

    this.game = game
  }

  build () {
    let tile

    for (let k = 0; k < this.bounds.h * this.bounds.w; k++) {
      const i = (k % this.bounds.w)
      const j = Math.floor(k / this.bounds.h)

      const name = this.map[j][i]
      const data = this._decode(name)

      const x = i * SIZE
      const y = j * SIZE
      const z = (data.needsBiggerZ) ? 34 : 0

      switch (data.type) {
        case 'source':
          tile = new Source(this.game, x, y, z, name, data.heading, this.tiles)

          this.source = tile
        break

        case 'target':
          tile = new Target(this.game, x, y, z, name, data.heading, this.tiles)

          this.target = tile
        break

        case 'curve':
          tile = new Curve(this.game, x, y, z, name, this.tiles)
        break

        default:
          tile = new Tile(this.game, x, y, z, name, null, this.tiles)
      }
    }
  }

  update () {
    this.source.update()
    this.target.update()
  }

  _decode (name) {
    const sheet = name[0]

    const index = parseInt(name.substr(1))

    let type = null

    if (sheet === 'c') {
      if (SOURCES.indexOf(index) >= 0) {
        type = 'source'
      } else if (TARGETS.indexOf(index) >= 0) {
        type = 'target'
      } else if (CURVES.indexOf(index) >= 0) {
        type = 'curve'
      }
    }

    let needsBiggerZ = type === 'source' || type === 'target'

    needsBiggerZ = needsBiggerZ && index !== 19 && index !== 25

    return {
      name,
      type,
      index,
      heading: (type === 'source' ? SOURCES : TARGETS).indexOf(index),
      needsBiggerZ
    }
  }
}
