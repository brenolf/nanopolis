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
      {name: "c041", quantity: 1}, {name: "c033", quantity: 1},
      {name: "c026", quantity: 1}, {name: "c034", quantity: 1},
      {name: "c025", quantity: 1}, {name: "c018", quantity: 1},
      {name: "c013", quantity: 1}, {name: "c019", quantity: 1},
      {name: "c122", quantity: 1}, {name: "c124", quantity: 1},
      {name: "c125", quantity: 1}, {name: "c126", quantity: 1},
      {name: "l126", quantity: 1}, {name: "l127", quantity: 1},
      {name: "l123", quantity: 1}, {name: "l125", quantity: 1},
      {name: "c081", quantity: 1}, {name: "c073", quantity: 1},
      {name: "l082", quantity: 1}, {name: "l074", quantity: 1}
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
