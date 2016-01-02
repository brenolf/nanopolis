export default class Menu {
  preload () {
  }

  init (data) {
    this.data = data
  }

  create () {
    this.game.stage.backgroundColor = '#101155'

    this.game.soundManager.playNewMusic('Hyperfun')

    this.game.add.button(this.game.world.centerX - 95, 400, 'menu_button',
      this.startGame, this, 'over', 'out', 'down')
  }

  startGame () {
    this.state.start('levelselect', true, false, this.data)
  }
}
