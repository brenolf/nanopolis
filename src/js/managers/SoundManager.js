export default class SoundManager {
  constructor (game) {
    this.game = game
    this.currentMusic = null
  }

  playNewMusic (key) {
    if (this.currentMusic !== null) {
      if (this.currentMusic.key === key) {
        this.resumeMusic
        return
      } else {
        this.currentMusic.pause()
      }
    }

    this.currentMusic = this.game.sound.play(key, 1, true)
  }

  resumeMusic () {
    if (this.currentMusic != null && this.currentMusic.paused) {
      this.currentMusic.resume()
    }
  }

  pauseMusic () {
    if (this.currentMusic != null) {
      this.currentMusic.pause()
    }
  }
}
