var ctx = document.getElementById("image");
let width = ctx.width;
let height = ctx.height;
let areas = new Array();

let rowCount = 50;
let colCount = 70;
let magnifier = 3;
let swooshLength = 20;
let animationSpeed = 0.1;

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

function drawImage(obj, targetMag, color, mag) {
  if (!obj) return;
  if (!mag) {
    mag = 1;
  }
  if (!color) {
    color = "#FF0000";
  }
  let nw = obj.w * mag,
    nh = obj.h * mag;

  let links = (nw - obj.w) / 2;
  let oben = (nh - obj.h) / 2;

  ctx.drawImage(
    theImage,
    obj.x,
    obj.y,
    obj.w,
    obj.h,
    obj.x - links,
    obj.y - oben,
    obj.w * mag,
    obj.h * mag
  );
  if (mag < targetMag) {
    window.requestAnimationFrame(function() {
      drawImage(obj, targetMag, color, mag + animationSpeed);
    });
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
          let lowerer = 0.8;
          let reducer = magnifier * lowerer;

          // move to left and right
          let mag = magnifier;
          for (let k = 1; k <= swooshLength; k++) {
            mag = mag * 0.8;
            if (mag > 1) {
              drawImage(areas[i + k][j], mag); // right

              drawImage(areas[i - k][j], mag); // left

              drawImage(areas[i][j + k], mag); //bottom
              drawImage(areas[i][j - k], mag); //top

              drawImage(areas[i + k][j + k], mag); // top right
              drawImage(areas[i - k][j - k], mag); // bbottom left

              drawImage(areas[i + k][j - k], mag); // top right
              drawImage(areas[i - k][j + k], mag); // bbottom left

              for (let l = 0; l < k; l++) {
                drawImage(areas[i + k][j + l], mag); // down
                drawImage(areas[i - k][j + l], mag); // up

                drawImage(areas[i + k][j - l], mag); // down
                drawImage(areas[i - k][j - l], mag); // up

                drawImage(areas[i - l][j + k], mag); //bottom
                drawImage(areas[i + l][j + k], mag); //bottom

                drawImage(areas[i + l][j - k], mag); //top
                drawImage(areas[i - l][j - k], mag); //top
              }
            }
            /*
            if(k == swooshLength) {
              if(areas[i]){
                for(let l = j+k; l<areas[i].length; i++){

                  drawImage(areas[i][l], mag, "#00FF00")

                }
              }
            }
            */
            //            drawImage(areas[i-k][j], magnifier * (1/k))
          }
          /*
          for(let k=swooshLenght; k>=0; k--) {
            areas[i+k][j];
          }

          for(let k=0; k<=swooshLenght; k++) {

            drawImage(areas[i+k][j+1], getK(k))
            drawImage(areas[i+k][j-1], getK(k))
            drawImage(areas[i+k][j], getK(k))
            drawImage(areas[i][j+k], getK(k))

          }

          for(let k=swooshLenght; k>=0; k--) {
            drawImage(areas[i-k][j+1], getK(k))
            drawImage(areas[i-k][j-1], getK(k))
            drawImage(areas[i-k][j], getK(k))
            drawImage(areas[i][j-k], getK(k))

          }*/

          drawImage(o, magnifier);
        }
      }
    }
    /*
    for (i = 0; i < areas.length; i++) {
      let o = areas[i];
      if (
        mousePos.x > o.x &&
        mousePos.x < o.x + o.w &&
        mousePos.y > o.y &&
        mousePos.y < o.y + o.h
      ) {
        console.log("Catch");
        resetImage();

        drawImage(areas[i+1], 1.5)
         drawImage(areas[i-1], 1.5)
        drawImage(o, 2);
      }
    }
    */
    var message = "Mouse position: " + mousePos.x + "," + mousePos.y;
    writeMessage(canvas, message);
  },
  false
);
