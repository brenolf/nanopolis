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
      'c081', 'c073', 'l082', 'l074', 'c125', 'c126', 'c122', 'c124', 'l075'
    ]
    this.context.ui.addObjectsToMap(tiles)
  }
}
