class Obstacle extends MoveableElement {
  constructor(x, y, w) {
    super(x, y, w, 50)
    
  }

  style() {
  	let bg1 = 'url("sprites/obstacle/bat-sprite.png")'


    return {
      'background-image': bg1,
      'background-size': '202px 202px',
      'background-position-y': '-150px',
      'background-repeat-y': 'no-repeat',
      'background-position-x': 100 + 'px',
      width: this.width,
      height: this.height,
    }
  }
}