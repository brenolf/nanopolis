import SoundManager from '../managers/SoundManager'

export default class Boot {
  preload () {
  }

  init (data) {
    this.data = data
  }

  create () {
    this.game.stage.backgroundColor = '#101155'

    this.game.soundManager = new SoundManager(this.game)

    this.state.start('preload', true, false, this.data)
  }
}
