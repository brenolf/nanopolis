import Tile from '../objects/Tile'
import Car from '../elements/Car'

const HALF_SIZE = require('../../json/game.json').tileSize / 2

export default class Source extends Tile {
  constructor () {
    super(...arguments)

    this.cars = []
  }

  spawn () {
    const {x, y} = this.ORIGINAL

    const car = new Car(
      this.game,
      x + HALF_SIZE,
      y + HALF_SIZE,
      0,
      this.direction
    )

    this.cars.push(car)

    car.move()
  }

  update () {
    this.cars = this.cars.filter(car => car.alive)
    this.cars.forEach(car => car.update())
  }
}
