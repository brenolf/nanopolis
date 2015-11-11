import Car from '../elements/Car'

export class World {
  init (data) {
    this.data = data;
  }

  preload () {
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
    this.game.world.setBounds(0, 0, 640, 480);
    this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    this.game.iso.anchor.setTo(0.5, 0);
  }

  create () {
    this.isoGroup = this.game.add.group();

    // Let's make a load of tiles on a grid.
    this.spawnTiles();

    this.options();

    this.cursorPos = new Phaser.Plugin.Isometric.Point3();

    this.car = new Car(this.game, 35, 35, 1);
  }

  spawnTiles () {
    let tile;
    for (let xx = 0; xx < 300; xx += 70) {
      for (let yy = 0; yy < 300; yy += 70) {
        let name = 'landscapeTiles_067.png';

        tile = this.game.add.isoSprite(xx, yy, 0, 'roads', name, this.isoGroup);
        tile.anchor.set(0.5, 0);
      }
    }
  }

  update () {
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);

    this.car.update()

    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    this.isoGroup.forEach(tile => {
        let inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y);
        // If it does, do a little animation and tint change.
        if (!tile.selected && inBounds) {
            tile.selected = true;
            tile.tint = 0x7800ff;
            // tile.loadTexture('roads', 'landscapeTiles_111.png')
            this.game.add.tween(tile).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
        // If not, revert back to how it was.
        else if (tile.selected && !inBounds) {
            tile.selected = false;
            tile.tint = 0xffffff;
            this.game.add.tween(tile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
    });
  }

  options () {
    let tiles = [75, 111, 112, 117, 67, 82, 125, 126, 67];

    this.tileOptions = this.game.add.group();

    tiles.forEach((tile, i) => {
      let name = `landscapeTiles_${tile < 100 ? '0' + tile : tile}.png`;

      let t = this.game.add.sprite(i * 80 + 10, 400, 'roads', name, this.tileOptions);

      t.scale.setTo(0.5);

      t.inputEnabled = true;
      t.input.useHandCursor = true;

      t.events.onInputDown.add(() => {
        t.tint = 0x7800ff;
      });

      t.events.onInputOver.add(() => {
        this.game.add.tween(t).to({ y: 395 }, 200, Phaser.Easing.Quadratic.InOut, true);
      });

      t.events.onInputOut.add(() => {
        this.game.add.tween(t).to({ y: 400 }, 200, Phaser.Easing.Quadratic.InOut, true);
      });
    })
  }

  pause () {
  }

  resume () {
  }
}
