const MAPS = require('../../json/maps.json')
const SIZE = 70
const SOURCES = [33, 26, 34, 41]
const TARGETS = [18, 13, 19, 25]

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

      const data = this._decode(this.map[i][j])

      const x = i * SIZE
      const y = j * SIZE
      const z = (data.needsBiggerZ) ? 34 : 0

      tile = this.game.add.isoSprite(x, y, z, 'roads', data.name, this.tiles)
      tile.anchor.set(0.5, 0)

      if (data.landmark) {
        this[data.landmark] = {
          x,
          y
        }
      }
    }
  }

  _decode (name) {
    const index = parseInt(name.substr(1))

    const isSource = SOURCES.indexOf(index) >= 0

    const isTarget = TARGETS.indexOf(index) >= 0

    const needsBiggerZ = (isSource || isTarget) && index !== 19 && index !== 25

    return {
      name,
      landmark: isSource ? 'source' : (isTarget ? 'target' : ''),
      isSource,
      isTarget,
      index,
      needsBiggerZ
    }
  }
}
