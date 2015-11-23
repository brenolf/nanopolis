import Car from '../elements/Car'

export default class Landmark {
  constructor (game, x, y, direction) {
    this.game = game
    this.x = x
    this.y = y
    this.cars = []
    this.direction = direction
  }

  spawn () {
    const car = new Car(this.game, 35, 35, 1, this.direction)

    this.cars.push(car)

    car.move()
  }

  update () {
    this.cars.forEach(car => car.update())
  }
}
