class Element {

  constructor(x, y, width, height) {
    this.x = 0
    this.y = 0
    this.width = 0
    this.height = 0
    this.x = x
    this.y = y
    this.width = width
    this.height = height
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

  coord(c) {
    return this.coords()[c]
  }

  inCollisionWith(el) {
    let thisc = this.coords();
    let elc = el.coords();
    let inCollision = !(
      thisc.r <= elc.l ||
      thisc.l >= elc.r ||
      thisc.t <= elc.b ||
      thisc.b >= elc.t
    );
    return inCollision
  }

  style() { return {}; }

  isVisibleOn(viewport) {
    let thisCoords = this.coords()
    let viewportCoords = viewport.coords()
    if (thisCoords['r'] <= viewportCoords['l']) return false
    if (thisCoords['l'] >= viewportCoords['r']) return false
    if (thisCoords['t'] <= viewportCoords['b']) return false
    if (thisCoords['b'] >= viewportCoords['t']) return false
    return true
  }
}