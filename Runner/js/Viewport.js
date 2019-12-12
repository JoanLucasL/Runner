class Viewport {

  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.map = null;
    this.width = w;
    this.height = h;
    // this.map = map;
  }

  coords() {
    let edges = {
      't': this.y + this.height,
      'r': this.x + this.width,
      'b': this.y,
      'l': this.x
    };
    let corners = {
      'tl': [edges.l, edges.t],
      'tr': [edges.r, edges.t],
      'bl': [edges.l, edges.b],
      'br': [edges.r, edges.b]
    }
    return {...edges, ...corners};
  }

  centralizeIn(player, world) {
    this.x = 0
    this.y = 0
    if (player.x > this.width / 2) {
      this.x = Math.min(player.x - (this.width / 2), world.width - this.width)
    }
    if (player.y > this.height / 2) {
      this.y = Math.min(player.y - (this.height / 2), world.height - this.height)
    }
  }

  style() {
    return `width: ${this.width}px, height: ${this.height}px`;
  }

  styleFor(element) {
    let style = element.style()
    style.left = element.x - this.x
    style.top = this.height - element.height - (element.y - this.y)

    // if (element.z > 0) {
    //   style.left *= (this.map.depth - element.z) / this.map.depth
    //   style.top *= (this.map.depth - element.z) / this.map.depth
    // }

    style.left += 'px'
    style.top += 'px'
    style.width += 'px'
    style.height += 'px'

    if (element.width == Infinity) {
      style.left = 0
      style.width = '100%'
    }
    if (element.height == Infinity) {
      style.top = 0
      style.height = '100%'
    }
    // console.log(Object.keys(style).map(property =>
    //   `${property}: ${style[property]}`
    // ).join(','));
    return style;
  }
}