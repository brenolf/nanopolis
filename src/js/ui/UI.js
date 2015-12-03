export default class UI {
  constructor (context) {
    this.context = context
    this.game = context.game

    this.wasDown = false;
  }

  buildInterface () {
    let tiles = [
      'c081', 'c073', 'l082', 'l074', 'c125', 'c126', 'c122', 'c124'
    ]

    this.tileOptions = this.game.add.group()

    this.selectedTile = null

    tiles.forEach((tile, i) => {
      let name = tile;

      const x = i * 80 + 10
      const y = 400

      let t = this.game.add.sprite(x, y, 'roads', name, this.tileOptions)

      t.scale.setTo(0.5)

      t.inputEnabled = true
      t.input.useHandCursor = true

      t.events.onInputDown.add(() => {
        if (this.selectedTile !== null) {
          this.selectedTile.tint = 0xffffff;
          this.game.add.tween(this.selectedTile).to({
            y: 400
          }, 200, Phaser.Easing.Quadratic.InOut, true)
        }
        t.tint = 0x7800ff
        this.selectedTile = t;
      })

      t.events.onInputOver.add(() => {
        this.game.add.tween(t).to({
          y: 395
        }, 200, Phaser.Easing.Quadratic.InOut, true)
      })

      t.events.onInputOut.add(() => {
        if (this.selectedTile !== t) {
          this.game.add.tween(t).to({
            y: 400
          }, 200, Phaser.Easing.Quadratic.InOut, true)
        }
      })
    })

    this.timer = this.game.add.text(
      this.game.world.width - 10,
      10,
      this.context.runningTime.seconds,
      {
        font: '65px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    this.timer.anchor.setTo(1, 0)
  }

  update () {
    this.timer.setText(Math.floor(this.context.runningTime.seconds))

    this.game.iso.unproject(this.game.input.activePointer.position, this.context.cursorPos)

    this.clicked = this.wasDown === false && this.game.input.activePointer.isDown === true

    this.wasDown = this.game.input.activePointer.isDown

    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    this.game.map.tiles.forEach((tile) => {
      var inBounds = tile.isoBounds.containsXY(this.context.cursorPos.x, this.context.cursorPos.y)
      // If it does, tint change.
      if (!tile.selected && inBounds && this.game.map.checkIfBlankTile(tile.name)) {
        tile.selected = true
        tile.tint = 0x86bfda
      } else if (tile.selected && !inBounds) {
        tile.selected = false
        tile.tint = 0xffffff
      }
      if (this.selectedTile !== null && this.clicked
          && inBounds && this.game.map.checkIfBlankTile(tile.name)) {
        this.game.map.addTile(tile.ID, this.selectedTile.frameName, true)
        this.game.iso.simpleSort(this.game.map.tiles)
        tile.destroy()
      }
    })
  }

  pause () {
    this.context.pause()
  }

  resume () {
    this.context.resume()
  }
}
