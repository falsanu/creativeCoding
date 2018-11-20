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
addEventListener("click", () => {
  init();
});

// Objects
function Slide(x, y, xId, yId, radius, rotation, color) {
  this.x = x;
  this.y = y;
  this.xId = xId;
  this.yId = yId;

  this.targetX;
  this.targetY;
  this.radius = radius;
  this.color = color;
  this.rotation = rotation;

  this.neighbours = {
    left: null,
    top: null,
    right: null,
    bottom: null,
    topRight: null,
    topLeft: null
  };
  // paint neigbours

  if (this.xId > 0) {
    //paint to left
    this.neighbours.left = getNeigbourPosition(this.xId - 1, this.yId);
  }
  if (this.xId < numObjectsX) {
    //paint to right
    this.neighbours.right = getNeigbourPosition(this.xId + 1, this.yId);
  }

  if (this.yId > 0) {
    this.neighbours.top = getNeigbourPosition(this.xId, this.yId - 1);
    // paint to top
    // getNeigbourPosition(this.xId, this.yId - 1);
  }
  if (this.yId < numObjectsY) {
    // paint to bottom
    // console.log(getNeigbourPosition(this.xId, this.yId - 1));
    this.neighbours.bottom = getNeigbourPosition(this.xId, this.yId + 1);
  }

  if (this.yId < numObjectsY && this.xId > 0 && this.xId % 2 == 0) {
    this.neighbours.topRight = getNeigbourPosition(this.xId - 1, this.yId + 1);
  }

  if (this.yId < numObjectsY && this.xId > 0 && Math.abs(this.xId % 2) == 1) {
    this.neighbours.topLeft = getNeigbourPosition(this.xId - 1, this.yId - 1);
  }

  //   objectsIndex++;
  //   objects[objectsIndex] = this;
  //   this.id = objectsIndex;
}

Slide.prototype.draw = function() {
  c.beginPath();
  c.fillText(this.xId, this.x + 15, this.y + 10);
  c.fillText(" - " + this.yId, this.x + 20, this.y + 10);
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.closePath();

  c.strokeStyle = this.color;
  c.lineWidth = 1;
  c.moveTo(this.x, this.y);
  if (this.neighbours.left) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.left.x, this.neighbours.left.y);
    c.stroke();
  }

  if (this.neighbours.right) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.right.x, this.neighbours.right.y);
    c.stroke();
  }

  if (this.neighbours.top) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.top.x, this.neighbours.top.y);
    c.stroke();
  }

  if (this.neighbours.bottom) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.bottom.x, this.neighbours.bottom.y);
    c.stroke();
  }
  if (this.neighbours.topLeft) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.topLeft.x, this.neighbours.topLeft.y);
    c.stroke();
  }
  if (this.neighbours.topRight) {
    c.moveTo(this.x, this.y);
    c.lineTo(this.neighbours.topRight.x, this.neighbours.topRight.y);
    c.stroke();
  }

  c.stroke();
  c.closePath();
};

function getNeigbourPosition(xId, yId) {
  //   console.log(objects);
  return objects.find(x => x.xId == xId && x.yId == yId);
}

Slide.prototype.update = function() {
  //   if (this.xId == 4 && this.yId == 2) {
  //   this.x = objects[this.id - 1].targetX;
  this.x = this.x + utils.randomIntFromRange(-1, 1);
  this.y = this.y + utils.randomIntFromRange(-1, 1);
  //   }

  //   this.targetX = this.x + 100;
  //   switch (this.rotation) {
  //     case 45:
  //       this.targetY = this.y + 100;
  //       break;
  //     case -45:
  //       this.targetY = this.y - 100;
  //       break;
  //     default:
  //       this.targetY = this.y;
  //       this.targetX = this.x + 200;
  //   }
  //   console.log(this.targetX, this.targetY);
  //   console.log(this.rotation);
  this.draw();
};

// Implementation
let objects;
let objectsIndex = 0;
const radius = 4;
const length = 300;
const initialShift = length - radius * 2;

const numObjectsX = Math.floor(canvas.width / (length / 2));
const numObjectsY = Math.floor(canvas.height / (length / 2)) + 2;

const color = "rgba(255,255,255,0.4)";
function init() {
  objects = [];

  for (let i = 0; i < numObjectsY; i++) {
    for (let j = 0; j < numObjectsX; j++) {
      const l = length;
      const shift = i % 2 ? l / 2 : 0;

      objects.push(
        new Slide(j * l - shift, (i * l) / 2, i, j, radius, -0, color)
      );
    }
  }
  console.log(objects);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(20,20,20,0.4)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //   c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  objects.forEach(object => {
    object.update();
  });

  //   for (var i in objects) {
  //     objects[i].update();
  //   }
}

init();
animate();
