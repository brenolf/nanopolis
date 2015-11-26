import GameSprite from '../objects/GameSprite'

const FRAME_HEADING = [2, 7, 6, 0]

const ANIMATIONS = {
  '32': [5, 6],
  '12': [11, 6],
  '30': [1, 2],
  '10': [8, 2],
  '03': [1, 0],
  '23': [5, 0],
  '01': [8, 7],
  '21': [11, 7]
}

export default class Car extends GameSprite {
  constructor (game, x, y, z, heading, group) {
    super(game, x, y, 0, 'cars', `carBlack1_00${FRAME_HEADING[heading]}`, group)

    this.game = game

    this.game.physics.isoArcade.enable(this)

    this.heading = heading

    this.lastCommand = null

    this.path = null

    this.totalPoints = -1
  }

  move (direction) {
    this.heading = direction || this.heading

    if (this.path === null) {
      return super.move(this.heading)
    }

    const pointsLeft = this.path.points.length

    if (this.totalPoints < 0) {
      this.totalPoints = pointsLeft
    }

    this.stop()

    const {x, y} = this.game.iso.unproject(this.path.points.shift())

    this.body.x = x
    this.body.y = y

    const steer = ANIMATIONS[`${this.heading}${this.path.next}`]

    if (pointsLeft === 1) {
      this.heading = this.path.next
      super.move(this.heading)
      this.path = null
      this.totalPoints = -1
    } else if (pointsLeft <= this.totalPoints / 4) {
      this.steer(steer[1])
    } else if (pointsLeft <= 3 * this.totalPoints / 4) {
      this.steer(steer[0])
    }
  }

  steer (frame) {
    frame = frame < 10 ? `0${frame}` : frame
    this.loadTexture('cars', `carBlack1_0${frame}`)
    this.anchor.set(0.5)
  }

  update () {
    if (this.path !== null) {
      this.move()
    }

    this.game.map.tiles.forEach(tile => {
      if (!tile.hover(this) || this.lastCommand === tile) {
        return
      }

      tile.tint = 0x994444

      switch (tile.constructor.name) {
        case 'Curve':
          this.path = tile.next(this)
          this.lastCommand = tile
        break

        case 'Target':
          this.destroy()
        break
      }
    })
  }
}
