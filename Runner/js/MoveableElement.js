class MoveableElement extends Element {

  constructor(x, y, width, height) {

    //this.lastPos = [0, 0]
    super(x, y, width, height)
    this.lastPos = [x, y]
    this.acc = [0, 0]
    this.vel = [0, 0]
  }

  last() {
    let clone = new Player(this.width, this.height)
    clone.x = this.lastPos[0]
    clone.y = this.lastPos[1]
    clone.lastPos = this.lastPos
    clone.acc = this.acc
    clone.vel = this.vel
    return clone
  }

  fwx() {
    let mv = this.maxVel()
    this.lastPos[0] = this.x
    this.x += Math.max(Math.min(this.vel[0], mv[0]['max']), mv[0]['min'])
    return this
  }

  fwy() {
    let mv = this.maxVel()
    this.lastPos[1] = this.y
    this.y += Math.max(Math.min(this.vel[1], mv[1]['max']), mv[1]['min'])
    return this
  }

  rwx(by) {
    this.x -= by
    return this
  }

  rwy(by) {
    this.y -= by
    return this
  }

  fw() {
    this.fwx()
    this.fwy()
    return this
  }

  stopx() {
    this.vel[0] = 0
    return this
  }
  stopy() {
    this.vel[1] = 0
    return this
  }

  maxVel() {
    return [
      {
        'min': -this.width,
        'max': this.width
      },
      {
        'min': -this.height,
        'max': this.height
      }
    ]
  }

  updateVel() {
    this.vel = this.vel.map((v, i) => {
      v = v + this.acc[i]
      let mv = this.maxVel()
      v = Math.min(v, mv[i]['max'])
      v = Math.max(v, mv[i]['min'])
      return v
    })
    // this.vel[0] = this.vel[0] > this.maxVel()[0] ? this.maxVel()[0] : this.vel[0]
    // this.vel[0] = this.vel[0] < -this.maxVel()[0] ? -this.maxVel()[0] : this.vel[0]
    // this.vel[1] = this.vel[1] > this.maxVel()[1] ? this.maxVel()[1] : this.vel[1]
    // this.vel[1] = this.vel[1] < -this.maxVel()[1] ? -this.maxVel()[1] : this.vel[1]
  }
}