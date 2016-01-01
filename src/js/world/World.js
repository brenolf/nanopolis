import Map from './Map'
import MapEditor from './MapEditor'

const GAME = require('../../json/game.json')
const STAGES = require('../../json/stages.json')

global.DIRECTION = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

export default class World {
  init (data) {
    this.data = data
  }

  preload () {
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game))
    this.game.world.setBounds(0, 0, GAME.width, GAME.height)
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE)
    this.game.iso.anchor.setTo(0.5, 0)
    this.stageIndex = GAME.firstStage
    this.stage = STAGES[this.stageIndex]

    if (GAME.mapEditorMode) {
      this.game.map = new MapEditor(this)
    } else {
      this.game.map = new Map(this.stage.map, this)
    }
  }

  create () {
    this.game.map.build()

    this.cursorPos = new Phaser.Plugin.Isometric.Point3()
  }

  update () {
    this.game.iso.unproject(
      this.game.input.activePointer.position,
      this.cursorPos
    )

    this.game.map.update()
  }

  pause () {
  }

  resume () {
  }
}
