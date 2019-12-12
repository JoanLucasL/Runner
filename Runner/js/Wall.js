class Wall extends Element {
  constructor(x, y, h) {
    super(x, y, 10, h)
  }

  style() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}