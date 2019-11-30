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


var ctx = document.getElementById("image");
var width = ctx.width;
var height = ctx.height;
var areas = new Array();

var rowCount = 20;
var colCount = 30;
var magnifier = 3;
var magnifierReducer = 1.2;
var swooshLength = 3;
var animationSpeed = 0.1;
var animate = true;

var imageSource = "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";

var theImage = new Image();

// create canvas
if (ctx.getContext) {
  ctx = ctx.getContext("2d");
}

function initCanvas() {
  //Loading of the home test image - img1
  var rectWidth = width / colCount;
  var rectHeight = height / rowCount;

  for (var j = 0; j < rowCount; j++) {
    for (var i = 0; i < colCount; i++) {
      var x = i * rectWidth,
          y = j * rectHeight,
          w = rectWidth,
          h = rectHeight;

      if (!areas[i]) {
        areas[i] = [];
      }
      areas[i].push({
        x: x,
        y: y,
        w: w,
        h: h,
        active: false
      });
    }
  }
  //drawing of the test image - img1
  theImage.onload = function () {
    console.log("Image Loaded");
  };
  theImage.src = imageSource;

  // sliceCanvas();
}

function sliceCanvas() {
  return;
  for (var j = 0; j < rowCount; j++) {
    for (var i = 0; i < colCount; i++) {
      var o = areas[i][j];
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    }
  }
}

function resetImage() {
  ctx.drawImage(theImage, 0, 0);
}

function drawImage(obj, direction, k, mag, targetMag) {
  if (!obj) return;
  if (!mag) {
    // mag = 1;
    mag = targetMag;
  }
  // if (!animate) {
  //   mag = targetMag;
  // }
  var color = "#FF0000";

  var nw = obj.w * mag,
      h = obj.h * mag;
  var left = (nw - obj.w) / 2;
  var top = (h - obj.h) / 2;

  var x = obj.x - left;
  var y = obj.y - top;

  if (targetMag != magnifier) {
    switch (direction) {
      case "t":
        top = 0;
        // console.log(top);
        // console.log();
        y = obj.y - (h - obj.h) / 2;
        // h = 200;
        break;
      case "tr":
        break;
      case "r":
        break;
      case "dr":
        break;
      case "d":
        // top = -nh * 2; //- obj.h + 200;
        break;
      case "dl":
        break;
      case "l":
        break;
      case "tl":
        break;
    }
  }

  ctx.drawImage(theImage, obj.x, obj.y, obj.w, obj.h, x, y, obj.w * mag, h);
  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(x, y, obj.w * mag, h);
  if (mag < targetMag) {
    // window.requestAnimationFrame(function() {
    //   drawImage(obj, direction, k, targetMag, mag + animationSpeed);
    // });
  }
}

initCanvas();

function writeMessage(canvas, message) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, 300, 50);
  context.font = "18pt Calibri";
  context.fillStyle = "black";
  context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
var canvas = document.getElementById("image");
var context = canvas.getContext("2d");

canvas.addEventListener("mousemove", function (evt) {
  var mousePos = getMousePos(canvas, evt);
  resetImage();

  for (var j = 0; j < rowCount; j++) {
    for (var i = 0; i < colCount; i++) {
      var o = areas[i][j];

      if (mousePos.x > o.x && mousePos.x < o.x + o.w && mousePos.y > o.y && mousePos.y < o.y + o.h) {
        // let lowerer = magnifierReducer;
        // let reducer = magnifier * lowerer;

        // move to left and right
        var mag = 0.5;
        for (var k = swooshLength; k >= 1; k--) {
          mag = mag + magnifierReducer;

          if (mag <= magnifier) {
            drawImage(areas[i + k][j + k], "d", k, mag); // top right
            drawImage(areas[i - k][j - k], "d", k, mag); // bbottom left

            drawImage(areas[i + k][j - k], "d", k, mag); // top right
            drawImage(areas[i - k][j + k], "d", k, mag); // bbottom left

            // for (let l = 0; l < k; l++) {
            //   drawImage(areas[i + k][j + l], "d", k, mag); // down
            //   drawImage(areas[i - k][j + l], "d", k, mag); // up

            //   drawImage(areas[i + k][j - l], "d", k, mag); // down
            //   drawImage(areas[i - k][j - l], "d", k, mag); // up

            //   drawImage(areas[i - l][j + k], "d", k, mag); //bottom
            //   drawImage(areas[i + l][j + k], "d", k, mag); //bottom

            //   drawImage(areas[i + l][j - k], "d", k, mag); //top
            //   drawImage(areas[i - l][j - k], "d", k, mag); //top
            // }

            drawImage(areas[i][j - k], "t", k, mag); //top

            drawImage(areas[i + k][j], "r", k, mag); // right

            drawImage(areas[i - k][j], "l", k, mag); // left

            drawImage(areas[i][j + k], "d", k, mag); //bottom
          }
        }
        drawImage(o, "t", 0, magnifier);
      }
    }
  }

  var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
  writeMessage(canvas, message);
}, false);

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map