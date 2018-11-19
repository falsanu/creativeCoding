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
	if (objects.length < 1000) {
		if (Math.random() * 100 > 10) {
			new Object(mouse.x, mouse.y, _utils2.default.randomIntFromRange(-2, 2), 2, _utils2.default.randomIntFromRange(8, 20));
		}
	}
});

addEventListener("resize", function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener("click", function () {
	init();
});

var particleIndex = 0;
var particles = {};
// Objects
function Object(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	particleIndex++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = _utils2.default.randomIntFromRange(40, 100);
	this.gravity = 0.5;
	this.hue = Math.random() * 255;
	this.alpha = 1;
	this.color = "hsla(" + this.hue + ",100%,50%," + this.alpha + ")";
}

Object.prototype.draw = function (lastPoint) {
	c.beginPath();
	c.lineCap = "round";
	c.strokeStyle = "hsla(" + this.hue + ",100%,50%," + this.alpha + ")";
	c.lineWidth = this.radius * (this.life / this.maxLife);
	c.moveTo(lastPoint.x, lastPoint.y);
	c.lineTo(this.x, this.y);

	// c.arc(
	// 	this.x,
	// 	this.y,
	// 	this.radius * (this.life / this.maxLife),
	// 	0,
	// 	Math.PI * 2,
	// 	false
	// );
	// c.fillStyle = "hsla(" + this.hue + ",100%,50%," + this.alpha + ")";
	// c.fill();

	c.stroke();
	c.closePath();
};

var friction = 0.9;
Object.prototype.update = function () {
	var lastPoint = {
		x: this.x,
		y: this.y
	};

	if (this.y + this.radius + this.dy > canvas.height || this.y - this.radius < 0) {
		this.dy = -this.dy * friction;
	} else {
		this.dy += this.gravity;
	}
	if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius <= 0) {
		this.dx = -this.dx * friction;
	}

	this.x += this.dx;
	this.y += this.dy;
	this.life++;
	this.alpha = this.maxLife / this.life - 1;
	if (this.life > this.maxLife) {
		delete particles[this.id];
	}
	this.draw(lastPoint);
};

// Implementation
var objects = void 0;
function init() {
	objects = [];

	console.log(objects);
}

var newNumbers = 2;
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.globalCompositeOperation = "source-over";
	c.fillStyle = "rgba(0,0,0,0.05)";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.globalCompositeOperation = "lighter";
	for (var _i = 0, j = _utils2.default.randomIntFromRange(1, newNumbers); _i < j; _i++) {
		var x = _utils2.default.randomIntFromRange(radius, canvas.width - radius),
		    y = _utils2.default.randomIntFromRange(0, canvas.height),

		// x = utils.randomIntFromRange(radius, canvas.width - radius),
		// y = utils.randomIntFromRange(canvas.height / 2, canvas.height - radius),
		dx = _utils2.default.randomIntFromRange(-2, 2),
		    dy = _utils2.default.randomIntFromRange(-2, 2),
		    radius = _utils2.default.randomIntFromRange(10, 20);

		new Object(x, y, dx, dy, radius);
	}

	for (var i in particles) {
		particles[i].update();
	}
}

init();
animate();

var webaudio_tooling_obj = function () {
	return;
	var audioContext = new AudioContext();

	console.log("audio is starting up ...");

	var BUFF_SIZE = 16384;

	var audioInput = null,
	    microphone_stream = null,
	    gain_node = null,
	    script_processor_node = null,
	    script_processor_fft_node = null,
	    analyserNode = null;

	if (!navigator.getUserMedia) navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({ audio: true }, function (stream) {
			start_microphone(stream);
		}, function (e) {
			alert("Error capturing audio.");
		});
	} else {
		alert("getUserMedia not supported in this browser.");
	}

	// ---

	function show_some_data(given_typed_array, num_row_to_display, label) {
		var size_buffer = given_typed_array.length;
		var index = 0;
		var max_index = num_row_to_display;

		// console.log("__________ " + label);

		for (; index < max_index && index < size_buffer; index += 1) {
			// console.log(given_typed_array[index]);
			newNumbers = given_typed_array[index] / 10;
		}
	}

	function process_microphone_buffer(event) {
		var i, N, inp, microphone_output_buffer;

		microphone_output_buffer = event.inputBuffer.getChannelData(0); // just mono - 1 channel for now

		// microphone_output_buffer  <-- this buffer contains current gulp of data size BUFF_SIZE

		show_some_data(microphone_output_buffer, 5, "from getChannelData");
	}

	function start_microphone(stream) {
		// return;
		gain_node = audioContext.createGain();
		gain_node.connect(audioContext.destination);

		microphone_stream = audioContext.createMediaStreamSource(stream);
		microphone_stream.connect(gain_node);

		script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);
		script_processor_node.onaudioprocess = process_microphone_buffer;

		microphone_stream.connect(script_processor_node);

		// // --- enable volume control for output speakers

		// document.getElementById("volume").addEventListener("change", function() {
		// 	var curr_volume = this.value;
		// 	gain_node.gain.value = curr_volume;

		// 	console.log("curr_volume ", curr_volume);
		// });

		// --- setup FFT

		script_processor_fft_node = audioContext.createScriptProcessor(2048, 1, 1);
		script_processor_fft_node.connect(gain_node);

		analyserNode = audioContext.createAnalyser();
		analyserNode.smoothingTimeConstant = 0;
		analyserNode.fftSize = 2048;

		microphone_stream.connect(analyserNode);

		analyserNode.connect(script_processor_fft_node);

		script_processor_fft_node.onaudioprocess = function () {
			// get the average for the first channel
			var array = new Uint8Array(analyserNode.frequencyBinCount);
			analyserNode.getByteFrequencyData(array);

			// draw the spectrogram
			if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {
				show_some_data(array, 5, "from fft");
			}
		};
	}
}(); //  webaudio_tooling_obj = function()

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