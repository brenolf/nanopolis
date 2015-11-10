let lines = [];

export default class Grid {
  constructor (game, columns, rows) {
    if (game === undefined || columns === undefined || rows === undefined) {
      throw new TypeError();
    }

    let w = Math.floor(game.width / columns);
    let h = Math.floor(game.height / rows);

    for (let i = 1; i <= rows; i++) {
      lines.push(new Phaser.Line(0, i * h, game.width, i * h));
    }

    for (let i = 1; i <= columns; i++) {
      lines.push(new Phaser.Line(i * w, 0, i * w, game.height));
    }

    this.game = game;
    this.w = w;
    this.h = h;
    this.columns = columns;
    this.rows = rows;
  }

  render () {
    lines.forEach(line => this.game.debug.geom(line));
  }

  real (blocks_x, blocks_y) {
    return {
      x: blocks_x * this.w,
      y: blocks_y * this.h
    };
  }

  tile (x, y) {
    return {
      x: Math.floor(x / this.w),
      y: Math.floor(y / this.h)
    };
  }
}
