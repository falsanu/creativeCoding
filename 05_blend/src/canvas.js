import './style.scss';

var ctx = document.getElementById('image');
let areas = new Array();

let options = {
  name: '04_WAVE',
  debug: false,
  image: {
    src:
      'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350',
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

let theImage = new Image();

function initCanvas(options = {}) {
  if (ctx.getContext) {
    ctx = ctx.getContext('2d');
  } else {
    console.log('no context found');
    process.exit(1);
  }

  // Defining width and height of single item
  let rectHeight = options.canvas.height / options.effect.rows;
  let rectWidth = options.canvas.width / options.effect.columns;

  // iterate through all rows and columns
  for (var j = 0, rows = options.effect.rows; j < rows; j++) {
    for (var i = 0, cols = options.effect.columns; i < cols; i++) {
      const x = i * rectWidth,
        y = j * rectHeight,
        w = rectWidth,
        h = rectHeight;

      // create new line
      if (!areas[i]) {
        areas[i] = [];
      }
      // add column to row
      areas[i].push({
        i,
        j,
        x,
        y,
        w,
        h,
        active: false
      });
    }
  }
}

// Load Image
function loadImage(options = {}) {
  console.log('loading image: ', options.image.src);

  theImage.onload = function() {
    console.log('Image Loaded');
    if (options.image.drawInitial) {
      ctx.drawImage(theImage, 0, 0);
    }
  };
  theImage.src = options.image.src;
}

function rasterCanvas(options = {}) {
  for (var j = 0; j < options.effect.rows; j++) {
    for (var i = 0; i < options.effect.columns; i++) {
      const o = areas[i][j];
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    }
  }
}

function resetImage() {
  ctx.drawImage(theImage, 0, 0);
}

function drawArea(obj, origin, k, mag, targetMag) {
  let speed = options.animation.speed;
  if (!obj) return;
  if (!targetMag && options.animation.enabled) {
    targetMag = mag;
    mag = 1;
    speed = k / options.animation.speed;
  }
  if (!obj.active) {
    let x2 = obj.i;
    let y2 = obj.j;

    let angle = Math.abs(
      Math.floor(Math.atan2(x2 - origin.x1, y2 - origin.y1) * (180 / Math.PI))
    );
    let radian = angle * (Math.PI / 180);
    let shortening = 1; // no shortening

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
    let mymag = mag * shortening;

    let nw = obj.w * mymag,
      h = obj.h * mymag;
    let left = (nw - obj.w) / 2;
    let top = (h - obj.h) / 2;

    let x = obj.x - left;
    let y = obj.y - top;

    ctx.drawImage(theImage, obj.x, obj.y, obj.w, obj.h, x, y, nw, h);

    if (options.debug) {
      var context = canvas.getContext('2d');
      context.globalAlpha = 0.3;
      context.fillStyle = 'white';
      context.fillRect(x, y, nw, h);
      context.globalAlpha = 1;
      context.font = '8pt Helvetica';
      context.fillStyle = 'black';
      let textX = x;
      context.fillText(k, textX + 2, y + 12);
      context.fillText(
        Math.floor(
          Math.atan2(x2 - origin.x1, y2 - origin.y1) * (180 / Math.PI)
        ) +
          '°' +
          shortening.toFixed(2),
        textX + 2,
        y + 24
      );
      // context.fillText(obj.i + '|' + obj.j, textX + 2, y + 24);
    }
    ctx.strokeStyle = 'hsla(' + k * 90 + ',100%,50%,100)';
    ctx.strokeRect(x, y, nw, h);

    // obj.active = true;
    if (options.animation.enabled && mag <= targetMag) {
      obj.active = false;
      requestAnimationFrame(function() {
        drawArea(
          obj,
          origin,
          k,
          mag + mag * options.animation.speed,
          targetMag
        );
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

canvas.addEventListener(
  'mousemove',
  function(evt) {
    var mousePos = getMousePos(canvas, evt);
    resetImage();

    for (var j = 0; j < options.effect.rows; j++) {
      for (var i = 0; i < options.effect.columns; i++) {
        let o = areas[i][j];
        o.active = false;
        if (
          mousePos.x > o.x &&
          mousePos.x < o.x + o.w &&
          mousePos.y > o.y &&
          mousePos.y < o.y + o.h
        ) {
          if (options.debug) {
            var message =
                'Mouse position: ' +
                mousePos.x +
                ',' +
                mousePos.y +
                ' x: ' +
                i +
                ', y: ' +
                j,
              j;
            writeMessage(canvas, message);
          }
          let mag = options.effect.magnifier || 0,
            swooshLength = options.effect.swooshLength || 2;

          let reducer = mag / (swooshLength + 1);

          let x1 = i;
          let y1 = j;

          // start with outer swoosh
          for (let k = swooshLength; k >= 1; k--) {
            if (k == swooshLength) {
              mag = 1;
            } else {
              mag = mag + reducer;
            }

            // angle calculation
            // let angle = Math.atan2(x2 - x1, y2 - y1) * (180/Math.PI)

            // calculation for swoosh-size

            if (mag < options.effect.magnifier) {
              drawArea(areas[i + k][j + k], { x1, y1 }, k, mag); // top right
              drawArea(areas[i - k][j - k], { x1, y1 }, k, mag); // bottom left
              drawArea(areas[i + k][j - k], { x1, y1 }, k, mag); // top right
              drawArea(areas[i - k][j + k], { x1, y1 }, k, mag); // bbottom left

              for (let l = 0; l < k; l++) {
                drawArea(areas[i + k][j + l], { x1, y1 }, k, mag); // down

                drawArea(areas[i - k][j + l], { x1, y1 }, k, mag); // up
                drawArea(areas[i + k][j - l], { x1, y1 }, k, mag); // down
                drawArea(areas[i - k][j - l], { x1, y1 }, k, mag); // up
                drawArea(areas[i - l][j + k], { x1, y1 }, k, mag); //bottom
                drawArea(areas[i + l][j + k], { x1, y1 }, k, mag); //bottom
                drawArea(areas[i + l][j - k], { x1, y1 }, k, mag); //top
                drawArea(areas[i - l][j - k], { x1, y1 }, k, mag); //top
              }

              drawArea(areas[i][j - k], { x1, y1 }, k, mag); //top
              drawArea(areas[i + k][j], { x1, y1 }, k, mag); // right
              drawArea(areas[i - k][j], { x1, y1 }, k, mag); // left
              drawArea(areas[i][j + k], { x1, y1 }, k, mag); //bottom
            }
          }

          // draw center with max magnifier
          drawArea(o, { x1, y1 }, 0, options.effect.magnifier);
        }
      }
    }
  },
  false
);

/**
 * Starts the whole show
 * @param {} options
 */
function runScript(options = {}) {
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
