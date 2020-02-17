const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const { innerWidth, innerHeight } = window

const canvasMargin = 20
// Set canvas dimensions
canvas.width = innerWidth - canvasMargin * 2
canvas.height = innerHeight - 200 - canvasMargin * 2

class Circle {
  constructor({ x, y, directionX, directionY, radius, hue = 1 }) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.radius = radius
    this.hue = hue
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`
    ctx.fill()
    ctx.stroke()
  }

  update() {
    this.draw()
    // If the circle reaches the sides, change direction
    if (this.x >= innerWidth - this.radius || this.x <= 0 + this.radius) {
      this.directionX = -this.directionX
    }
    // If the circles reaches the ceiling or floor, change direction
    if (this.y >= innerHeight - this.radius || this.y <= 0 + this.radius) {
      this.directionY = -this.directionY
    }

    // Increment x and y by direction
    this.x += this.directionX
    this.y += this.directionY
  }
}

function generateCircles(number) {
  const circles = []
  for (let i = 0; i < number; i++) {
    // initialize radius, x, y and x and y velocities
    const radius = 30
    let x = Math.random() * (innerWidth - radius * 2) + radius // radius * 2 = circumference
    // Math.random() - 0.5 will give you a random negative or positive value
    let directionX = (Math.random() - 0.5) * 20
    let y = Math.random() * (innerHeight - radius * 2) + radius
    let directionY = (Math.random() - 0.5) * 20

    const circle = new Circle({
      x,
      y,
      directionX,
      directionY,
      radius,
      hue: i * 5
    })

    circles.push(circle)
  }
  return circles
}

const circles = generateCircles(50)

function classCircleAnimate() {
  // requestAnimationFrame creates a loop that calls animate
  // Animation works by refreshing the page, and on each refresh,
  // we move our item incrementally which creates the illusion
  // of animation
  requestAnimationFrame(classCircleAnimate)
  // Clear the entire canvas so that new circles don't overlap with previous circles
  ctx.clearRect(0, 0, innerWidth, innerHeight)

  circles.forEach(circle => circle.update())
}
