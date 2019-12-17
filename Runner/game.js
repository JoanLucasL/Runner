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
    setTimeout(this.loop, 1000 / this.frequency)
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
      return this.keys['ArrowUp']
    },
    shouldFall() {
      return this.keys['ArrowDown']
    },
    processInputs() {
      let movement = this.calcMovement()
      let shouldJump = this.shouldJump()
      let shouldFall = this.shouldFall()

      if (shouldJump) {
        this.player.jump()
      } 
      if (shouldFall) {
      	this.player.fall()
      }
      // this.player.moveBy(movement[0] * 20)
    },
    gameLogic() {
      this.processInputs()
      this.world.move()
      // verifica se a posição y do jogador é menor que zero. se for, perdeu.
      if (this.player.y > -70) {
      return true
      } else {
        return false
      }
      // detect collisions
      // resolve collisions
    },
    loop() {
      if (this.gameLogic()) {
        setTimeout(this.loop, 1000 / this.frequency)
      } else {
        // perdeu
        if(confirm("Jogar Novamente?")){ window.location.reload()} else { window.location.assign("runner.html")}
      }
      // if (this.keys['Shift']) {
      // }
      if (this.keys['ArrowUp']) {
      }
      // console.log(this.player.y)
      this.time++
    }
  }
})