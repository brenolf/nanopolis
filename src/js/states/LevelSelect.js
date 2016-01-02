export default class LevelSelect {
  preload () {
  }

  init (data) {
    this.data = data
  }

  create () {
    let startx = 10
    let starty = 10

    this.game.stage.backgroundColor = '#101155'
    this.createButtons()
  }

  createButtons () {
    let startx = 10
    let starty = 10
    let endx = this.game.width - 10
    let endy = this.game.height - 10
    let buttonw = 130
    let buttonh = 130
    let columns = 4
    let rows = 3

    let spacingx = ((endx - startx) - (columns * buttonw)) / (columns - 1)
    let spacingy = ((endy - starty) - (rows * buttonh)) / (rows - 1)

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let buttonx = startx + i * (spacingx + buttonw)
        let buttony = starty + j * (spacingy + buttonh)
        let stage = 1 + (j * columns) + i
        this.game.add.button(buttonx, buttony, 'stage_button',
          this.startGame(stage), this)
      }
    }
  }

  startGame (stage) {
    return function () {
      this.data.stage = stage
      this.state.start('game', true, false, this.data)
    }
  }
}
