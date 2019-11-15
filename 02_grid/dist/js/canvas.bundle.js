/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

var colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // init();
});
addEventListener("click", function () {
  init();
});

// Objects
function Slide(x, y, xId, yId, radius, color) {
  this.x = x;
  this.y = y;
  this.xId = xId;
  this.yId = yId;

  this.targetX;
  this.targetY;
  this.radius = radius;
  this.color = color;

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

Slide.prototype.draw = function () {
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
  return objects.find(function (x) {
    return x.xId == xId && x.yId == yId;
  });
}

Slide.prototype.update = function () {
  //   if (this.xId == 4 && this.yId == 2) {
  //   this.x = objects[this.id - 1].targetX;
  // this.x = this.x + utils.randomIntFromRange(-1, 1);
  // this.y = this.y + utils.randomIntFromRange(-1, 1);
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
var objects = void 0;
var objectsIndex = 0;
var radius = 4;
var length = 300;
var initialShift = length - radius * 2;

var marginLeft = 100;
var topDownDistance = 100;

var numObjectsX = 6; //Math.floor(canvas.width / (length / 2));
var numObjectsY = 5; //Math.floor(canvas.height / (length / 2)) + 2;

var color = "rgba(255,255,255,0.4)";
var nextL = 0;
function init() {
  objects = [];

  // +---+------+---------+------+---+
  // 0   1      2         3      4   5
  for (var i = 0; i < numObjectsY; i++) {
    nextL = 0;
    for (var j = 0; j < numObjectsX; j++) {
      var l = nextL;

      switch (j) {
        case 0:
          nextL += 0;
          break;
        case 1:
          nextL += 10;
          break;
        case 2:
          nextL += 50;
          break;
        case 3:
          nextL += 100;
          break;
        case 4:
          nextL += 50;
          break;
        case 5:
          nextL += 10;
          break;
      }

      console.log(nextL);
      var shift = 0; //i % 2 ? l / 2 : 0;
      var x = marginLeft + nextL;
      var y = i * topDownDistance / 2 + 100;

      objects.push(new Slide(x, y, i, j, radius, color));
    }
  }
  console.log(objects);
}

// Animation Loop
function animate() {
  // requestAnimationFrame(animate);
  c.fillStyle = "rgba(20,20,20,1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  //   c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
  objects.forEach(function (object) {
    object.update();
  });

  //   for (var i in objects) {
  //     objects[i].update();
  //   }
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map