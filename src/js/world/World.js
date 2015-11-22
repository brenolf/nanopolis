import Car from '../elements/Car'
import Map from './Map'

const GAME = require('../../json/game.json')

export class World {
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

    this.car = new Car(this.game, 35, 35, 1)
  }

  update () {
    this.game.iso.unproject(
      this.game.input.activePointer.position,
      this.cursorPos
    )

    this.car.update()
  }

  pause () {
  }

  resume () {
  }
}
