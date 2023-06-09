// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let heliImg = document.createElement("img");
heliImg.src = "img/heliGreenTransparent.png";
let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";
let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";
let keyIsPressed = false;
let dpressed = false;
let apressed = false;

let state;
let heli;
let wall1, wall2, wall3, wall4;

reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

//event

document.addEventListener("keyup", keyupHandler);
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keydown", keydownHandler2);
document.addEventListener("keyup", keyupHandler2);
function keydownHandler2(event) {
  if (!event.repeat) {
    if (event.keyCode === 68) {
      dpressed = true;
    } else if (event.keyCode === 65) {
      apressed = true;
    }
  }
}
function keyupHandler2(event) {
  if (!event.repeat) {
    if (event.keyCode === 68) {
      dpressed = false;
    } else if (event.keyCode === 65) {
      apressed = false;
    }
  }
}
function keydownHandler(event) {
  if (event.keyCode === 87) {
    keyIsPressed = true;

    // play propeller sound
    propeller.currentTime = 0;
    propeller.play();

    //start game on moudsedown
    if (state === "start") {
      state = "gameon";
    }
  }
}

function keyupHandler() {
  keyIsPressed = false;
  propeller.pause();
}
