let world = new World(window)

let game = new Vue({
  el: '#game',
  data: {
    world: world,
    player: world.player,
    viewport: world.viewport,
    keys: {},
    frequency: 60,
    time: 0,

    gameControl: {
      isJumping: false
    }
  },
  mounted: function() {
    this.$el.focus()
    setInterval(this.loop, 1000 / this.frequency)
    this.player.moveBy(3)
    this.player.accelerateBy(0.001)
    // this.loop()
  },
  methods: {
    keyup: function(evt) {
      this.keys[evt.key] = false
    },
    keydown: function(evt) {
      this.keys[evt.key] = true
    },



    calcMovement() {
      let movement = [
        this.keys['ArrowRight'] ? 1 : (this.keys['ArrowLeft'] ? -1 : 0)
        ,
        this.keys['ArrowDown'] ? 1 : (this.keys['ArrowUp'] ? -1 : 0)
      ]
      // if (this.mainAxe()) {
      //   let mainAxe = this.mainAxe()
      //   movement = movement.map((v, i) =>
      //     Math.abs(mainAxe[i]) > 0.1 ? mainAxe[i] : v
      //   )
      // }
      return movement
    },
    shouldJump() {
      return this.keys[' ']
    },
    processInputs() {
      let movement = this.calcMovement()
      let shouldJump = this.shouldJump()

      if (shouldJump) {
        this.player.jump()
      }
      // this.player.moveBy(movement[0] * 20)
    },
    gameLogic() {
      this.processInputs()
      this.world.move()
      // detect collisions
      // resolve collisions
    },
    loop() {
      this.gameLogic()
      // if (this.keys['Shift']) {
      // }
      if (this.keys[' ']) {
      }
      // console.log(this.player.y)
      this.time++
    }
  }
})