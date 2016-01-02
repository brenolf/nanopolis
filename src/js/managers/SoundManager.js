export default class SoundManager {
  constructor (game) {
    this.game = game
    this.currentMusic = null
  }

  playNewMusic (key) {
    if (this.currentMusic != null) {
      this.currentMusic.pause()
    }
    this.currentMusic = this.game.sound.play(key, 1, true)
  }

  playMusic () {
    if (this.currentMusic != null) {
      this.currentMusic.play()
    }
  }

  pauseMusic () {
    if (this.currentMusic != null) {
      this.currentMusic.pause()
    }
  }
}
