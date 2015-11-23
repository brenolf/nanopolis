import GameSprite from '../objects/GameSprite'

export default class Car extends GameSprite {
  constructor (game, x, y, z, group) {
    super(game, x, y, z, 'cars', 'carBlack1_006', group)
  }
}
