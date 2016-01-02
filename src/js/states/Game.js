import World from '../world/World'
import UI from '../ui/UI'

export default class Game extends World {
  create () {
    super.create()

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.ui = new UI(this)

    this.ui.buildInterface()

    this.game.isPaused = false

    this.game.map.initialize()

    this.game.soundManager.playNewMusic(this.stage.musicName)
  }

  update () {
    if (this.game.isPaused) {
      return
    }

    super.update()
    this.ui.update()
  }

  lost () {
  }

  won () {
  }

  pause () {
    this.game.isPaused = true
    this.runningTime.pause()
    super.pause()
  }

  resume () {
    this.game.isPaused = false
    this.runningTime.resume()
    super.resume()
  }
}
