export default class OverlayMenu {
  constructor (context) {
    this.buttons = []

    this.context = context

    this.game = this.context.game
  }

  showMenu (ui, resumeCallback, levelSelectCallback, mainMenuCallback) {
    this.buttons.push(this.game.add.button(this.game.world.centerX - 95, 100,
      'menu_button', resumeCallback, ui, 'over', 'out', 'down'))
    this.buttons.push(this.game.add.button(this.game.world.centerX - 95, 200,
      'menu_button', levelSelectCallback, ui, 'over', 'out', 'down'))
    this.buttons.push(this.game.add.button(this.game.world.centerX - 95, 300,
      'menu_button', mainMenuCallback, ui, 'over', 'out', 'down'))



  }

  hideMenu () {
    while (this.buttons.length > 0) {
      let button = this.buttons.shift()
      button.destroy()
    }
  }
}
