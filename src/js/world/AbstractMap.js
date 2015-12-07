import Tile from '../objects/Tile'
import Source from '../elements/Source'
import Target from '../elements/Target'
import Curve from '../elements/Curve'
import Road from '../elements/Road'

const MAPS = require('../../json/maps.json')
const SIZE = require('../../json/game.json').tileSize
const TILES = require('../../json/tiles.json')

export default class Map {
  constructor (index, context) {
    this.map = MAPS[index]

    this.bounds = {
      w: this.map[0].length,
      h: this.map.length
    }

    this.game = context.game
    this.context = context

    this.tiles = this.game.add.group()
    this.tiles.indexes = []
  }

  addTile (k, name, allSet) {
    let tile;

    const i = (k % this.bounds.w)
    const j = Math.floor(k / this.bounds.h)

    name = name || this.map[j][i];

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

        // DEBUG:
        // this.game.bmd.rect(tile.x, tile.y, 3, 3, 'red')
        // this.game.bmd.rect(tile.x - 60, tile.y + 30, 3, 3, 'yellow')
        // this.game.bmd.rect(tile.x, tile.y + 60, 3, 3, 'magenta')
        // this.game.bmd.rect(tile.x + 60, tile.y + 30, 3, 3, 'black')
        // this.game.bmd.rect(tile.x, tile.y + 30, 3, 3, 'blue')
        // this.game.bmd.rect(tile.x + 30, tile.y + 45, 3, 3, 'cyan')
        // this.game.bmd.rect(tile.x - 30, tile.y + 15, 3, 3, 'lightgreen')
        // this.game.bmd.rect(tile.x + 30, tile.y + 15, 3, 3, 'orange')
        // this.game.bmd.rect(tile.x - 30, tile.y + 45, 3, 3, 'white')
      break

      case 'road':
        tile = new Road(this.game, x, y, z, name, this.tiles)
      break

      default:
        tile = new Tile(this.game, x, y, z, name, null, this.tiles)
    }

    tile.ID = k

    tile.connected[DIRECTION.UP] = null
    tile.connected[DIRECTION.DOWN] = null
    tile.connected[DIRECTION.LEFT] = null
    tile.connected[DIRECTION.RIGHT] = null

    if (j - 1 >= 0) {
      const index = (j - 1) * this.bounds.w + i
      const parent = this.tiles.indexes[index]
      //if (allSet === true) parent.tint = 0x000000;

      tile.connected[DIRECTION.UP] = parent
      parent.connected[DIRECTION.DOWN] = tile
    }

    if (i - 1 >= 0) {
      const index = j * this.bounds.w + i - 1
      const parent = this.tiles.indexes[index]
      //if (allSet === true) parent.tint = 0x000000;

      tile.connected[DIRECTION.LEFT] = parent
      parent.connected[DIRECTION.RIGHT] = tile
    }

    if (allSet === true) {
      if (j + 1 < this.bounds.h) {
        const index = (j + 1) * this.bounds.w + i
        const parent = this.tiles.indexes[index]
        //parent.tint = 0x000000;

        tile.connected[DIRECTION.DOWN] = parent
        parent.connected[DIRECTION.UP] = tile
      }

      if (i + 1 < this.bounds.w) {
        const index = j * this.bounds.w + i + 1
        const parent = this.tiles.indexes[index]
        //parent.tint = 0x000000;

        tile.connected[DIRECTION.RIGHT] = parent
        parent.connected[DIRECTION.LEFT] = tile
      }
    }
    if(allSet){
      this.tiles.indexes[k] = tile;
    } else {
      this.tiles.indexes.push(tile);
    }

  }

  build () {
    this.game.bmd = this.game.add.bitmapData(this.game.width, this.game.height)
    this.game.bmd.addToWorld()

    for (let k = 0; k < this.bounds.h * this.bounds.w; k++) {
      this.addTile(k)
    }
  }

  initialize () {

  }

  update () {

  }

  checkIfBlankTile (tile) {
    let name = tile.name
    const data = this._decode(name)
    return data.type === 'tile'
  }

  checkIfSourceOrTarget (tile) {
    let name = tile.name
    const data = this._decode(name)
    return data.type === 'source' || data.type === 'target'
  }

  _decode (name) {
    let type = null

    let heading = null

    for (let t in TILES) {
      heading = TILES[t].indexOf(name)

      if (heading >= 0) {
        type = t
        break
      }
    }

    if (type === null) {
      type = 'tile';
    }

    let needsBiggerZ = type === 'source' || type === 'target'

    needsBiggerZ = needsBiggerZ && name !== 'c019' && name !== 'c025'

    return {
      name,
      type,
      heading,
      needsBiggerZ
    }
  }
}
