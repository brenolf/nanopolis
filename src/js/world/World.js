import Map from './Map'

const GAME = require('../../json/game.json')

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

    this.map = new Map(0, this.game)
  }

  create () {
    this.map.build()

    this.cursorPos = new Phaser.Plugin.Isometric.Point3()
  }

  update () {
    this.game.iso.unproject(
      this.game.input.activePointer.position,
      this.cursorPos
    )
  }

  pause () {
  }

  resume () {
  }
}
