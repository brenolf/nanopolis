import GameSprite from '../objects/GameSprite'

export default class Tile extends GameSprite {
  constructor (game, x, y, z, name, group) {
    const CURVES = {
      'c125': [DIRECTION.LEFT, DIRECTION.DOWN],
      'c126': [DIRECTION.UP, DIRECTION.LEFT],
      'c122': [DIRECTION.LEFT, DIRECTION.DOWN],
      'c124': [DIRECTION.UP, DIRECTION.RIGHT]
    }

    super(game, x, y, z, 'roads', name, group)

    this.anchor.set(0.5, 0)

    this.game = game

    this.name = name

    this.curve = CURVES[name]
  }
}
