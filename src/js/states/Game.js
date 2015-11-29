import World from '../world/World'
import UI from '../ui/UI'

export default class Game extends World {
  create () {
    super.create()

    this.runningTime = this.time.create(false)
    this.runningTime.start()

    this.ui = new UI(this)

    this.ui.buildInterface()

    this.paused = false

    this.game.map.source.spawn()
  }

  update () {
    super.update()
    this.ui.update()
  }

  lost () {
  }

  won () {
  }

  pause () {
    this.paused = true
    super.pause()
  }

  resume () {
    this.paused = false
    super.resume()
  }
}
