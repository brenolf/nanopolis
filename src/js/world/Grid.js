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

  real (blocks_x, blocks_y, blocks_z) {
    return {
      x: blocks_x,
      y: blocks_y,
      z: blocks_z
    };
  }

  tile (x, y, z) {
    return {
      x,
      y,
      z
    };
  }
}
