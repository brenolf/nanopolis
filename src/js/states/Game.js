import World from '../world/World'
import UI from '../ui/UI'

export default class Game extends World {
  create () {
    super.create()

    this.START = this.game.time.now

    this.ui = new UI(this)

    this.ui.buildInterface()

    this.paused = false

    this.game.map.source.spawn()
  }

  render () {
  }

  update () {
    super.update()
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
