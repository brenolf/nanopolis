export default class UI {
  constructor (context, bgData) {
    this.context = context;
    this.game = context.game;
    this.bgData = bgData;
  }

  getBackground () {
  }

  buildInterface () {
  }

  pause () {
    this.context.pause();
  }

  resume () {
    this.context.resume();
  }
}
