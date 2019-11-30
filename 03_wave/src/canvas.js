var ctx = document.getElementById("image");
let width = ctx.width;
let height = ctx.height;
let areas = new Array();

let rowCount = 20;
let colCount = 30;
let magnifier = 3;
let magnifierReducer = 1.2;
let swooshLength = 3;
let animationSpeed = 0.1;
let animate = true;

let imageSource =
  "https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350";

let theImage = new Image();

// create canvas
if (ctx.getContext) {
  ctx = ctx.getContext("2d");
}

function initCanvas() {
  //Loading of the home test image - img1
  let rectWidth = width / colCount;
  let rectHeight = height / rowCount;

  for (var j = 0; j < rowCount; j++) {
    for (var i = 0; i < colCount; i++) {
      const x = i * rectWidth,
        y = j * rectHeight,
        w = rectWidth,
        h = rectHeight;

      if (!areas[i]) {
        areas[i] = [];
      }
      areas[i].push({
        x,
        y,
        w,
        h,
        active: false
      });
    }
  }
  //drawing of the test image - img1
  theImage.onload = function() {
    console.log("Image Loaded");
  };
  theImage.src = imageSource;

  // sliceCanvas();
}

function sliceCanvas() {
  return;
  for (var j = 0; j < rowCount; j++) {
    for (var i = 0; i < colCount; i++) {
      const o = areas[i][j];
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
  let color = "#FF0000";

  let nw = obj.w * mag,
    h = obj.h * mag;
  let left = (nw - obj.w) / 2;
  let top = (h - obj.h) / 2;

  let x = obj.x - left;
  let y = obj.y - top;

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

canvas.addEventListener(
  "mousemove",
  function(evt) {
    var mousePos = getMousePos(canvas, evt);
    resetImage();

    for (var j = 0; j < rowCount; j++) {
      for (var i = 0; i < colCount; i++) {
        let o = areas[i][j];

        if (
          mousePos.x > o.x &&
          mousePos.x < o.x + o.w &&
          mousePos.y > o.y &&
          mousePos.y < o.y + o.h
        ) {
          // let lowerer = magnifierReducer;
          // let reducer = magnifier * lowerer;

          // move to left and right
          let mag = 0.5;
          for (let k = swooshLength; k >= 1; k--) {
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
  },
  false
);
