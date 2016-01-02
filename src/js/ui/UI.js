import OverlayMenu from './OverlayMenu'
const GAME = require('../../json/game.json')

export default class UI {
  constructor (context) {
    this.context = context
    this.game = context.game

    this.wasDown = false;

    this.currentTile = 0;

    this.tiles = []

    this.pauseMenu = new OverlayMenu(context)

    this.game.add.button(this.game.world.width - 50, 10, 'pause_button',
      this.pause, this)
  }

  updateTileXY (tile, x, y) {
    tile.x = x
    tile.y = y
    tile.quantityText.x = x
    tile.quantityText.y = y
  }

  reorganizeTiles (index = 0) {
    for (let i = index; i < this.tiles.length; i++) {
      this.tiles[i].uiPositionIndex--;
      let xy = this.calculateXYUIPosition (i)

      this.updateTileXY (this.tiles[i], xy.x, xy.y)
    }
  }

  calculateXYUIPosition (i) {
    let y = 360

    if (i >= 11) {
      y = 440
      i = i - 11
    }

    const x = i * 80 + 10

    return {x: x, y: y}
  }

  addPlaceableTilesToUI (tiles) {
    tiles.forEach((tile, i) => {
      this.addPlaceableTileToUI(tile)
    })
  }

  addPlaceableTileToUI (tile) {
    let name = tile.name;

    let i = this.currentTile
    this.currentTile++

    let xy = this.calculateXYUIPosition (i)
    let x = xy.x
    let y = xy.y

    let t = this.game.add.sprite(x, y, 'roads', name, this.tileOptions)

    t.uiPositionIndex = i

    this.tiles.push(t)

    t.name = name

    //changing the property dynamically. Is it a good idea?
    t.quantity = tile.quantity

    t.quantityText = this.game.add.text(
      t.x,
      t.y,
      t.quantity,
      {
        font: '8px Arial',
        fill: '#ff0044',
        align: 'center'
      }
    )

    t.y = y

    t.scale.setTo(0.5)

    t.inputEnabled = true
    t.input.useHandCursor = true

    t.events.onInputDown.add(() => {
      if (this.selectedTile !== null) {
        this.selectedTile.tint = 0xffffff;
        this.game.add.tween(this.selectedTile).to({
          y: this.selectedTile.y
        }, 200, Phaser.Easing.Quadratic.InOut, true)
      }
      t.tint = 0x7800ff
      this.selectedTile = t
    })

    t.events.onInputOver.add(() => {
      this.game.add.tween(t).to({
        y: y - 5
      }, 200, Phaser.Easing.Quadratic.InOut, true)
    })

    t.events.onInputOut.add(() => {
      if (this.selectedTile !== t) {
        this.game.add.tween(t).to({
          y: y
        }, 200, Phaser.Easing.Quadratic.InOut, true)
      }
    })
  }

  removePlaceableTileFromUI (tile) {
    this.tiles.splice(tile.uiPositionIndex, 1)

    this.reorganizeTiles(tile.uiPositionIndex)

    this.currentTile--

    tile.quantityText.destroy()
    tile.destroy()
  }

  buildInterface () {
    this.tileOptions = this.game.add.group()

    this.selectedTile = null

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

  checkIfPlaceable (mapTile, uiTile) {
    if (this.game.map.checkIfBlankTile(mapTile)) {
      return true
    }

    if (this.game.map.checkIfBlankTile(uiTile)) {
      if (!this.game.map.checkIfSourceOrTarget(mapTile)) {
        return true
      }
    }

    return false
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
      if (!tile.selected && this.selectedTile !== null &&
          inBounds && this.checkIfPlaceable(tile, this.selectedTile)) {
        tile.selected = true
        tile.tint = 0x86bfda
      } else if (tile.selected && !inBounds) {
        tile.selected = false
        tile.tint = 0xffffff
      }
      if (this.selectedTile !== null && this.clicked
          && inBounds && this.checkIfPlaceable(tile, this.selectedTile)) {
        this.game.map.addTile(tile.ID, this.selectedTile.frameName, true)
        this.game.iso.simpleSort(this.game.map.tiles)
        tile.destroy()

        if (!GAME.mapEditorMode) {
          this.selectedTile.quantity--;

          if (this.selectedTile.quantity <= 0) {
            this.removePlaceableTileFromUI(this.selectedTile)
            this.selectedTile = null
          } else {
            this.selectedTile.quantityText.setText(this.selectedTile.quantity)
          }
        }
      }
    })
  }

  pause () {
    this.pauseMenu.showMenu(this, this.resume, this.levelSelect, this.mainMenu)
    this.context.pause()
  }

  resume () {
    this.pauseMenu.hideMenu()
    this.context.resume()
  }

  levelSelect () {
    this.resume ()
    this.game.state.start('levelselect', true, false, {})
  }

  mainMenu () {
    this.resume ()
    this.game.state.start('menu', true, false, {})
  }
}
