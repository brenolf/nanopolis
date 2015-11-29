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
  constructor (game, x, y, z, heading, source, group) {
    super(game, x, y, 0, 'cars', `carBlack1_00${FRAME_HEADING[heading]}`, group)

    this.game = game

    this.current = source

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

    const left = this.path.points.length

    if (this.totalPoints < 0) {
      this.totalPoints = left
    }

    this.stop()

    const {x, y} = this.game.iso.unproject(this.path.points.shift())

    this.body.x = x
    this.body.y = y

    if (left <= this.totalPoints / 4 || left <= 3 * this.totalPoints / 4) {
      this.steer((left <= this.totalPoints / 4) ^ 0)
    }

    if (left === 1) {
      this.heading = this.path.next
      super.move(this.heading)
      this.path = null
      this.totalPoints = -1
    }
  }

  steer (frame) {
    const animation = ANIMATIONS[`${this.heading}${this.path.next}`]

    frame = animation[frame] < 10 ? `0${animation[frame]}` : animation[frame]
    this.frameName = `carBlack1_0${frame}`
  }

  update () {
    let tile = this.current

    const index = this.path ? this.path.next : this.heading

    const nextTile = tile.connected[index]

    if (!this.valid(nextTile)) {
      return this.stop()
    }

    if (nextTile.hover(this)) {
      this.current = tile = nextTile
    }

    tile.tint = 0x994444

    this.move()

    if (this.lastCommand === tile) {
      return
    }

    switch (tile.constructor.name) {
      case 'Curve':
        this.path = tile.getPath(this.heading)
        this.lastCommand = tile
      break

      case 'Target':
        this.destroy()
      break
    }
  }

  valid (tile) {
    if (tile === null) {
      return false
    }

    const heading = this.path ? this.path.next : this.heading

    switch(tile.constructor.name) {
      case 'Curve':
        return tile.getPath(heading) !== null

      case 'Road':
        return tile.nextHeading(heading) !== -1

      case 'Target':
        return true
    }

    return false
  }
}
