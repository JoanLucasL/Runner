class World {

  constructor(window, w = Infinity, h = Infinity) {
    this.width = 0
    this.height = 0

    this.viewport = null
    this.player = null

    this.surfaces = []
    this.grounds = []
    this.obstacles =[]

    this.gravity = -1
    // this.width = Math.min(window.innerWidth, w)
    this.width = Infinity
    this.height = Math.min(window.innerHeight, h)
    var height = Math.min(Math.random(this.height, 4))
    this.setViewportFor(window)
    this.player = new Player(214/3, 192/3)
    this.player.acc[1] = this.gravity

    this.addBoundaries()
    this.addGrounds()
    this.addObstacles()
  }

  setViewportFor(window) {
    this.viewport = new Viewport(
        Math.min(window.innerWidth, this.width),
        Math.min(window.innerHeight, this.height)
    )
  }

  adapt() {
    if (this.grounds[this.grounds.length - 2].isVisibleOn(this.viewport)) {
      this.addGrounds(5)
    }
    if (this.obstacles[this.obstacles.length - 2].isVisibleOn(this.viewport)) {
      this.addObstacles(5)
    }
  }

  addGrounds(n = 4) {
    let vw = this.viewport.width
    let maxw = vw
    let y = -20
    for (let i = 0; i < n; i++) {
      let last = this.grounds.slice(-1)[0]
      let x = last ? last.x : -500
      x += 600
      
      let w = 400  + Math.round(Math.random() * 100)
      
      console.log(x, y, w)
      let ground = new Ground(x, y, w)
      this.grounds.push(ground)
      this.surfaces.push(ground)
      x += maxw
    }
  }

  addObstacles(n = 4) {
    let vw = this.viewport.width
    let maxw = vw
    let y = 100 + Math.floor(Math.random() * 190)
    for (let i = 0; i < n; i++) {
      let last = this.obstacles.slice(-1)[0]
      let x = last ? last.x : Math.round(Math.random() * (400 - 600) + 400)
      x += 600
      
       let w = 50

       let obstacle = new Obstacle(x, y, w)
       this.obstacles.push(obstacle)
       this.surfaces.push(obstacle)
       x += Math.round(Math.random() * (400 - 600) + maxw)
      }
    }

  addBoundaries() {
    // obstacles
    this.surfaces.push(
       new Obstacle(Infinity, 0, Infinity)
    )
    // floor
    this.surfaces.push(
      new Ground(0, this.height, Infinity)
    )
    // left wall
    this.surfaces.push(
      new Wall(0, 0, this.height)
    )
  }

  addHeightSurface(){
  	new Ground(0,random)
  }

  addWalls(n) {
    [...Array(n)].map(_ => {
      let x = Math.round(Math.random() * this.width)
      let y = Math.round(Math.random() * this.height)
      let h = 100 + (50 - Math.round(Math.random() * 100))
      this.walls.push(
        new Wall(x, y, w)
      )
    })
    // left
    this.walls.push(
      new Wall(0, 0, this.height)
    )
    // roof
    this.walls.push(
      new Wall(0, this.height - 10, this.height)
    )
  }



  visibleSurfaces() {
    return this.surfaces.filter(s => s.isVisibleOn(this.viewport))
  }

  detectPlayerCollisions() {
    return this.visibleSurfaces().filter(ground => this.player.inCollisionWith(ground))
  }

  resolvePlayerCollisions(collisionElements) {
    let player = this.player
    collisionElements.map(element => {
      let collidedInX = player.last().fwx().inCollisionWith(element) &&
                        !player.last().fwy().inCollisionWith(element)
      let collidedInY = player.last().fwy().inCollisionWith(element) &&
                        !player.last().fwx().inCollisionWith(element)
      let dx = player.vel[0] > 0 ? player.coord('r') - element.coord('l') : player.coord('l') - element.coord('r')
      let dy = player.vel[1] > 0 ? player.coord('t') - element.coord('b') : player.coord('b') - element.coord('t')
      // console.log(player)
      // console.log(player.last())
      // console.log(player.last().fwy())
      // console.log(element, dx, dy, collidedInX, collidedInY)
      if (collidedInX) {
        player.rwx(dx).stopx()
      } else if (collidedInY) {
        player.rwy(dy).stopy()
      } else {
        player.rwx(dx).rwy(dy).stopx().stopy()
      }
    })
  }

  resolvePlayerXCollisions(collisionElements) {
        let player = this.player
        collisionElements.map(element => {
          let dx = player.vel[0] > 0 ? player.coord('r') - element.coord('l') : player.coord('l') - element.coord('r')
          player.rwx(dx).stopx()
        })
  }

  resolvePlayerYCollisions(collisionElements) {
    let player = this.player
    collisionElements.map(element => {
      let dy = player.vel[1] > 0 ? player.coord('t') - element.coord('b') : player.coord('b') - element.coord('t')
      player.rwy(dy).stopy()
    })
  }

  movex() {
    this.player.fwx()
    let collisionElements = this.detectPlayerCollisions()
    this.resolvePlayerXCollisions(collisionElements)
  }

  movey() {
    this.player.fwy()
    let collisionElements = this.detectPlayerCollisions()
    this.resolvePlayerYCollisions(collisionElements)
  }

  move() {
    this.movex()
    this.movey()
    this.player.updateVel()
    this.viewport.centralizeIn(this.player, this)
    this.adapt()
  }
}