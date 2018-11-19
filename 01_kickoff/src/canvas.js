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
	if (objects.length < 1000) {
		if (Math.random() * 100 > 10) {
			new Object(
				mouse.x,
				mouse.y,
				utils.randomIntFromRange(-2, 2),
				2,
				utils.randomIntFromRange(8, 20)
			);
		}
	}
});

addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener("click", () => {
	init();
});

let particleIndex = 0;
let particles = {};
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
	this.maxLife = utils.randomIntFromRange(40, 100);
	this.gravity = 0.5;
	this.hue = Math.random() * 255;
	this.alpha = 1;
	this.color = "hsla(" + this.hue + ",100%,50%," + this.alpha + ")";
}

Object.prototype.draw = function(lastPoint) {
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
Object.prototype.update = function() {
	const lastPoint = {
		x: this.x,
		y: this.y
	};

	if (
		this.y + this.radius + this.dy > canvas.height ||
		this.y - this.radius < 0
	) {
		this.dy = -this.dy * friction;
	} else {
		this.dy += this.gravity;
	}
	if (
		this.x + this.radius + this.dx >= canvas.width ||
		this.x - this.radius <= 0
	) {
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
let objects;
function init() {
	objects = [];

	console.log(objects);
}

let newNumbers = 2;
// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.globalCompositeOperation = "source-over";
	c.fillStyle = "rgba(0,0,0,0.05)";
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.globalCompositeOperation = "lighter";
	for (let i = 0, j = utils.randomIntFromRange(1, newNumbers); i < j; i++) {
		let x = utils.randomIntFromRange(radius, canvas.width - radius),
			y = utils.randomIntFromRange(0, canvas.height),
			// x = utils.randomIntFromRange(radius, canvas.width - radius),
			// y = utils.randomIntFromRange(canvas.height / 2, canvas.height - radius),
			dx = utils.randomIntFromRange(-2, 2),
			dy = utils.randomIntFromRange(-2, 2),
			radius = utils.randomIntFromRange(10, 20);

		new Object(x, y, dx, dy, radius);
	}

	for (var i in particles) {
		particles[i].update();
	}
}

init();
animate();

var webaudio_tooling_obj = (function() {
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

	if (!navigator.getUserMedia)
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia(
			{ audio: true },
			function(stream) {
				start_microphone(stream);
			},
			function(e) {
				alert("Error capturing audio.");
			}
		);
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

		script_processor_fft_node.onaudioprocess = function() {
			// get the average for the first channel
			var array = new Uint8Array(analyserNode.frequencyBinCount);
			analyserNode.getByteFrequencyData(array);

			// draw the spectrogram
			if (microphone_stream.playbackState == microphone_stream.PLAYING_STATE) {
				show_some_data(array, 5, "from fft");
			}
		};
	}
})(); //  webaudio_tooling_obj = function()
