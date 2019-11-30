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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var ctx = document.getElementById('image');
var areas = new Array();

var options = {
  name: '04_WAVE',
  debug: false,
  image: {
    src: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
    drawInitial: true
  },
  canvas: {
    width: ctx.width,
    height: ctx.height
  },
  effect: {
    raster: false,
    enable: true,
    magnifier: 2.5,
    swooshLength: 2,
    rows: ctx.height / 70,
    columns: ctx.width / 70
  },
  animation: {
    enabled: false,
    speed: 0.1
  }
};

var theImage = new Image();

function initCanvas() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (ctx.getContext) {
    ctx = ctx.getContext('2d');
  } else {
    console.log('no context found');
    process.exit(1);
  }

  // Defining width and height of single item
  var rectHeight = options.canvas.height / options.effect.rows;
  var rectWidth = options.canvas.width / options.effect.columns;

  // iterate through all rows and columns
  for (var j = 0, rows = options.effect.rows; j < rows; j++) {
    for (var i = 0, cols = options.effect.columns; i < cols; i++) {
      var x = i * rectWidth,
          y = j * rectHeight,
          w = rectWidth,
          h = rectHeight;

      // create new line
      if (!areas[i]) {
        areas[i] = [];
      }
      // add column to row
      areas[i].push({
        i: i,
        j: j,
        x: x,
        y: y,
        w: w,
        h: h,
        active: false
      });
    }
  }
}

// Load Image
function loadImage() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.log('loading image: ', options.image.src);

  theImage.onload = function () {
    console.log('Image Loaded');
    if (options.image.drawInitial) {
      ctx.drawImage(theImage, 0, 0);
    }
  };
  theImage.src = options.image.src;
}

function rasterCanvas() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var j = 0; j < options.effect.rows; j++) {
    for (var i = 0; i < options.effect.columns; i++) {
      var o = areas[i][j];
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    }
  }
}

function resetImage() {
  ctx.drawImage(theImage, 0, 0);
}

function drawArea(obj, origin, k, mag, targetMag) {
  var speed = options.animation.speed;
  if (!obj) return;
  if (!targetMag && options.animation.enabled) {
    targetMag = mag;
    mag = 1;
    speed = k / options.animation.speed;
  }
  if (!obj.active) {
    var x2 = obj.i;
    var y2 = obj.j;

    var angle = Math.abs(Math.floor(Math.atan2(x2 - origin.x1, y2 - origin.y1) * (180 / Math.PI)));
    var radian = angle * (Math.PI / 180);
    var shortening = 1; // no shortening

    // This is definitfely weired!
    if (angle < 45) {
      // cos
      shortening = Math.cos(radian);
    } else if (angle < 135) {
      // sin
      shortening = Math.sin(radian);
    } else if (angle < 225) {
      // cos
      shortening = Math.cos(radian);
    } else if (angle < 315) {
      // sin
      shortening = Math.sin(radian);
    } else {
      // cos
      shortening = Math.cos(radian);
    }

    shortening = Math.abs(shortening);
    var mymag = mag * shortening;

    var nw = obj.w * mymag,
        h = obj.h * mymag;
    var left = (nw - obj.w) / 2;
    var top = (h - obj.h) / 2;

    var x = obj.x - left;
    var y = obj.y - top;

    ctx.drawImage(theImage, obj.x, obj.y, obj.w, obj.h, x, y, nw, h);

    if (options.debug) {
      var context = canvas.getContext('2d');
      context.globalAlpha = 0.3;
      context.fillStyle = 'white';
      context.fillRect(x, y, nw, h);
      context.globalAlpha = 1;
      context.font = '8pt Helvetica';
      context.fillStyle = 'black';
      var textX = x;
      context.fillText(k, textX + 2, y + 12);
      context.fillText(Math.floor(Math.atan2(x2 - origin.x1, y2 - origin.y1) * (180 / Math.PI)) + '°' + shortening.toFixed(2), textX + 2, y + 24);
      // context.fillText(obj.i + '|' + obj.j, textX + 2, y + 24);
    }
    ctx.strokeStyle = 'hsla(' + k * 90 + ',100%,50%,100)';
    ctx.strokeRect(x, y, nw, h);

    // obj.active = true;
    if (options.animation.enabled && mag <= targetMag) {
      obj.active = false;
      requestAnimationFrame(function () {
        drawArea(obj, origin, k, mag + mag * options.animation.speed, targetMag);
      });
    }
  }
}

// DEBUGGING

function writeMessage(canvas, message) {
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, 300, 50);
  context.font = '12pt Calibri';
  context.fillStyle = 'black';
  context.fillText(message, 10, 25);
}

// EFFECT PART

var canvas = document.getElementById('image');
var context = canvas.getContext('2d');

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function (evt) {
  var mousePos = getMousePos(canvas, evt);
  resetImage();

  for (var j = 0; j < options.effect.rows; j++) {
    for (var i = 0; i < options.effect.columns; i++) {
      var o = areas[i][j];
      o.active = false;
      if (mousePos.x > o.x && mousePos.x < o.x + o.w && mousePos.y > o.y && mousePos.y < o.y + o.h) {
        if (options.debug) {
          var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y + ' x: ' + i + ', y: ' + j,
              j;
          writeMessage(canvas, message);
        }
        var mag = options.effect.magnifier || 0,
            swooshLength = options.effect.swooshLength || 2;

        var reducer = mag / (swooshLength + 1);

        var x1 = i;
        var y1 = j;

        // start with outer swoosh
        for (var k = swooshLength; k >= 1; k--) {
          if (k == swooshLength) {
            mag = 1;
          } else {
            mag = mag + reducer;
          }

          // angle calculation
          // let angle = Math.atan2(x2 - x1, y2 - y1) * (180/Math.PI)

          // calculation for swoosh-size

          if (mag < options.effect.magnifier) {
            drawArea(areas[i + k][j + k], { x1: x1, y1: y1 }, k, mag); // top right
            drawArea(areas[i - k][j - k], { x1: x1, y1: y1 }, k, mag); // bottom left
            drawArea(areas[i + k][j - k], { x1: x1, y1: y1 }, k, mag); // top right
            drawArea(areas[i - k][j + k], { x1: x1, y1: y1 }, k, mag); // bbottom left

            for (var l = 0; l < k; l++) {
              drawArea(areas[i + k][j + l], { x1: x1, y1: y1 }, k, mag); // down

              drawArea(areas[i - k][j + l], { x1: x1, y1: y1 }, k, mag); // up
              drawArea(areas[i + k][j - l], { x1: x1, y1: y1 }, k, mag); // down
              drawArea(areas[i - k][j - l], { x1: x1, y1: y1 }, k, mag); // up
              drawArea(areas[i - l][j + k], { x1: x1, y1: y1 }, k, mag); //bottom
              drawArea(areas[i + l][j + k], { x1: x1, y1: y1 }, k, mag); //bottom
              drawArea(areas[i + l][j - k], { x1: x1, y1: y1 }, k, mag); //top
              drawArea(areas[i - l][j - k], { x1: x1, y1: y1 }, k, mag); //top
            }

            drawArea(areas[i][j - k], { x1: x1, y1: y1 }, k, mag); //top
            drawArea(areas[i + k][j], { x1: x1, y1: y1 }, k, mag); // right
            drawArea(areas[i - k][j], { x1: x1, y1: y1 }, k, mag); // left
            drawArea(areas[i][j + k], { x1: x1, y1: y1 }, k, mag); //bottom
          }
        }

        // draw center with max magnifier
        drawArea(o, { x1: x1, y1: y1 }, 0, options.effect.magnifier);
      }
    }
  }
}, false);

/**
 * Starts the whole show
 * @param {} options
 */
function runScript() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  console.log('Startup: ', options.name);
  console.log(options);

  // creates the initial parts of the image
  initCanvas(options);

  // loads and draws the image
  loadImage(options);

  // create raster over image
  if (options.effect.raster) {
    rasterCanvas(options);
  } else {
    console.log('slicer disabled');
  }
}

runScript(options);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map