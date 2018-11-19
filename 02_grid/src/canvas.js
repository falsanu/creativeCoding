import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
function Slide(x, y, radius, rotation, color) {
  this.x = x;
  this.y = y;
  this.targetX;
  this.targetY;
  this.radius = radius;
  this.color = color;
  this.length = 100;
  this.rotation = rotation;

  objectsIndex++;
  objects[objectsIndex] = this;
  this.id = objectsIndex;
}

Slide.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();

  c.lineWidth = 1;
  c.moveTo(this.x, this.y);
  //   console.log(this.targetX, this.targetY);
  c.lineTo(this.targetX, this.targetY);
  c.stroke();
  c.closePath();
};

Slide.prototype.update = function() {
  //   this.x = this.x + utils.randomIntFromRange(-3, 3);
  //   this.y = this.y + utils.randomIntFromRange(-3, 3);
  //   if (objects[this.id - 1]) {
  //     this.x = objects[this.id - 1].targetX;
  //   }

  this.targetX = this.x + 100;
  switch (this.rotation) {
    case 45:
      this.targetY = this.y + 100;
      break;
    case -45:
      this.targetY = this.y - 100;
      break;
    default:
      this.targetY = this.y;
      this.targetX = this.x + 200;
  }
  //   console.log(this.targetX, this.targetY);
  //   console.log(this.rotation);
  this.draw();
};

// Implementation
let objects = {};
let objectsIndex = 0;
const radius = 4;
const length = 200;
const initialShift = length - radius * 2;
function init() {
  objects = [];
  const numObjectsX = Math.floor(canvas.width / 100);
  const numObjectsY = Math.floor(canvas.height / 100);

  for (let i = 0; i < numObjectsY; i++) {
    for (let j = 0; j < numObjectsX; j++) {
      const shift = i % 2 ? length / 2 : 0;
      new Slide(j * length - shift, i * 100, radius, -0, "black");
      new Slide(j * length - shift, i * 100, radius, -45, "black");
      new Slide(j * length - shift, i * 100, radius, 45, "black");
    }
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  //   c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  objects.forEach(object => {
    object.update();
  });

  for (var i in objects) {
    objects[i].update();
  }
}

init();
animate();
