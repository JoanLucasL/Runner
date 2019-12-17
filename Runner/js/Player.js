class Player extends MoveableElement {
  // col = false
  constructor(w, h) {
    //jumping = false
    //lastVelY = 0
    super(10, 400, w, h);
    this.lastVelY = 0
    this.jumping = false
    this.falling = false
    this.frame = 0
    console.log(this.acc)
  }

  //override
  maxVel() {
    return [
      {
        'min': -10,
        'max': 15
      },
      {
        'min': -10,
        'max': 20
      }
    ]
  }

  jump() {
    if (!this.jumping) {
      this.vel[1] = 20
      this.jumping = true
    }
  }
  fall() {
    if (!this.falling) {
      this.vel[1] = -100
      this.falling = true
    }
  }

  updateVel() {
    super.updateVel()
    // this.acc[1] = Math.min(-1, -parseFloat((this.vel[0] / 3).toFixed(2)))
    // console.log(this.lastVelY, this.vel[1], this.vel[1] == this.lastVelY)
    // console.log(this.vel[0], this.vel[1], this.acc[1])
    if (this.vel[1] == this.lastVelY && this.lastVelY != this.maxVel()[1]['min']) {
      this.jumping = false
    }
    this.lastVelY = this.vel[1]
    this.frame = (this.frame + 1) % (100 / this.vel[0])
  }

  moveBy(vel) {
    this.vel[0] = vel
  }

  accelerateBy(acc) {
    this.acc[0] = acc
  }

  style() {
    //let color = `hsl(${this.frame}, 80%, 30%)`
    let bg = 'url("sprites/player/Run__00' + Math.floor(this.frame / (10 / this.vel[0]) ) + '.png")'
    return {
      'background-image': bg,
      'background-size': '74px 66px',
      width: this.width,
      height: this.height,
    }
  }
}