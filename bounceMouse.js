const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const { innerWidth, innerHeight } = window

const canvasMargin = 20
const canvasWidth = innerWidth - canvasMargin * 2
const canvasHeight = innerHeight - 200 - canvasMargin * 2
// Set canvas dimensions
canvas.width = canvasWidth
canvas.height = canvasHeight

window.addEventListener("mousemove", () => {
  console.log("mouse move")
})

class Circle {
  constructor({ x, y, directionX, directionY, radius, color = "black" }) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = `#${this.color}`
    ctx.fill()
  }

  update() {
    this.draw()
    // If the circle reaches the sides, change direction
    if (this.x >= canvasWidth - this.radius || this.x <= 0 + this.radius) {
      this.directionX = -this.directionX
    }
    // If the circles reaches the ceiling or floor, change direction
    if (this.y >= canvasHeight - this.radius || this.y <= 0 + this.radius) {
      this.directionY = -this.directionY
    }

    // Increment x and y by direction
    this.x += this.directionX
    this.y += this.directionY
  }
}

function generateCircles(number) {
  const colors = ["FA532E", "262626", "DBEFF9", "233D53"]
  const circles = []

  for (let i = 0; i < number; i++) {
    // initialize radius, x, y and x and y velocities
    // Math.random() - 0.5 will give you a random negative or positive value
    const radius = 30 + (Math.random() - 0.5) * 40

    let x = Math.random() * (canvasWidth - radius * 2) + radius // radius * 2 = circumference
    let directionX = (Math.random() - 0.5) * 10
    let y = Math.random() * (canvasHeight - radius * 2) + radius
    let directionY = (Math.random() - 0.5) * 10

    const color = colors[Math.floor(Math.random() * colors.length)]

    const circle = new Circle({
      x,
      y,
      directionX,
      directionY,
      radius,
      color
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
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  circles.forEach(circle => circle.update())
}

classCircleAnimate()
