export default class UI {
  constructor (context) {
    this.context = context
    this.game = context.game
  }

  buildInterface () {
    let tiles = [75, 111, 112, 117, 67, 82, 125, 126, 67]

    this.tileOptions = this.game.add.group()

    tiles.forEach((tile, i) => {
      let name = `l${tile < 100 ? '0' + tile : tile}`

      const x = i * 80 + 10
      const y = 400

      let t = this.game.add.sprite(x, y, 'roads', name, this.tileOptions)

      t.scale.setTo(0.5)

      t.inputEnabled = true
      t.input.useHandCursor = true

      t.events.onInputDown.add(() => {
        t.tint = 0x7800ff
      })

      t.events.onInputOver.add(() => {
        this.game.add.tween(t).to({
          y: 395
        }, 200, Phaser.Easing.Quadratic.InOut, true)
      })

      t.events.onInputOut.add(() => {
        this.game.add.tween(t).to({
          y: 400
        }, 200, Phaser.Easing.Quadratic.InOut, true)
      })
    })
  }

  pause () {
    this.context.pause()
  }

  resume () {
    this.context.resume()
  }
}
