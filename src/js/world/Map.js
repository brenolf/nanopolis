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
  constructor (index, game) {
    super(index, game)
  }

  update () {
    this.source.update()
    this.target.update()
  }

  initialize () {
    super.initialize()
    this.source.spawn()

    let tiles = [
      {name: "c081", quantity: 5}, {name: "c073", quantity: 1},
      {name: "l082", quantity: 4}, {name: "l074", quantity: 1},
      {name: "c125", quantity: 3}, {name: "c126", quantity: 1},
      {name: "c122", quantity: 2}, {name: "c124", quantity: 1},
      {name: "l075", quantity: 1}
    ]
    this.context.ui.addPlaceableTilesToUI(tiles)
  }
}
