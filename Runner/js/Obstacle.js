class Obstacle extends Element {
  constructor(x, y, w) {
    super(x, y, w, 64)
  }

  style() {
  	let bg1 = 'url("sprites/floor/tile2.png")'
    return {
      'background-image': bg1,
      // 'background-size': '109px 109px',
      'background-position-y': '-16px',
      'background-repeat-y': 'no-repeat',
      width: this.width,
      height: this.height,
    }
  }
}