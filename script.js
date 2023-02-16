const network = document.getElementById("network");
const ctx = network.getContext("2d");
const points = [];

const pointRadius = 5;
const lineWidth = 2;
const maxLines = 50;
const speed = 0.5;
const connectionRadius = 400;
const lineColor = "50, 0, 0";
const pointColor = "rgba(150, 0, 0, 1)";

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
network.width = canvasWidth;
network.height = canvasHeight;

for (let i = 0; i < maxLines; i++) {
  const x = Math.floor(Math.random() * canvasWidth);
  const y = Math.floor(Math.random() * canvasHeight);
  const lineSpeed = Math.random() * speed;
  points.push({ x, y, dx: (Math.random() - 0.5) * lineSpeed, dy: (Math.random() - 0.5) * lineSpeed });
}

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < i; j++) {
      const distance = Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
      if (distance < connectionRadius) {
        const opacity = (1 - distance / connectionRadius) / 2;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < points.length; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, pointRadius, 0, 2 * Math.PI);
    ctx.fillStyle = pointColor;
    ctx.fill();

    points[i].x += points[i].dx;
    points[i].y += points[i].dy;

    if (points[i].x <= -200 || points[i].x >= canvasWidth + 200 || points[i].y <= -200 || points[i].y >= canvasHeight + 200) {
      // Entferne den Punkt, wenn er den Rand erreicht
      points.splice(i, 1);
      // Erstelle einen neuen Punkt an einer zufälligen Position außerhalb des Sichtfelds
      let newX, newY;
      if (Math.random() < 0.5) {
        newX = Math.random() < 0.5 ? -200 : canvasWidth + 200;
        newY = Math.floor(Math.random() * (canvasHeight + 400)) - 200;
      } else {
        newX = Math.floor(Math.random() * (canvasWidth + 400)) - 200;
        newY = Math.random() < 0.5 ? -200 : canvasHeight + 200;
      }
      const newPoint = {
        x: newX,
        y: newY,
        dx: (Math.random() - 0.5) * speed,
        dy: (Math.random() - 0.5) * speed,
      };
      points.push(newPoint);
    }
  }

  requestAnimationFrame(draw);
}

draw();

// Ändern der Canvas-Größe
function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight
;
  network.width = canvasWidth;
  network.height = canvasHeight;
}
window.addEventListener('resize', resizeCanvas);
