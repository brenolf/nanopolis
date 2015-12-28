import Tile from '../objects/Tile'
import Source from '../elements/Source'
import Target from '../elements/Target'
import Curve from '../elements/Curve'
import Road from '../elements/Road'
import AbstractMap from './AbstractMap'

const MAPS = require('../../json/maps.json')
const SIZE = require('../../json/game.json').tileSize
const TILES = require('../../json/tiles.json')

export default class Map extends AbstractMap {
  constructor (context) {
    super(0, context)
  }

  build () {
    super.build()
  }

  initialize () {
    super.initialize()

    this.game.add.button(10, 10, 'l075', this.saveMap, this)

    let tiles = [
      "c041", "c033", "c026", "c034", "c025", "c018", "c013", "c019",
      "c122", "c124", "c125", "c126", "l126", "l127", "l123", "l125",
      "c081", "c073", "l082", "l074"
    ]

    this.context.ui.addPlaceableTilesToUI(tiles)
  }

  createMapArray () {
    let map = []
    let row = []
    for (let k = 0; k < this.bounds.h * this.bounds.w; k++) {
      if (k !== 0 && k % this.bounds.w == 0) {
          map.push(row)
          row = []
      }
      row.push(this.tiles.indexes[k].name)
    }
    map.push(row)
    return map
  }

  saveMap () {
    console.log(JSON.stringify(this.createMapArray()))
  }
}
