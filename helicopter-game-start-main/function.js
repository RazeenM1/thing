// FUNCTIONS

// Draw Start Screen
function drawStart() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText(`HELICOPTER GAME `, 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  best = best;
  distance = 0;
  speed = -3;
}
function checkCollisions() {
  // check cllison with the top green bar and bottom bar
  if (heli.y + heli.h < 85) {
    heli.y = heli.y + 5;
    heli.accel += 1;
  } else if (heli.y + heli.h > cnv.height - 50) {
    heli.y = heli.y - 5;
    heli.accel += -1;
  }
}

frames;
//Draw Game Elements
function runGame() {
  //logic
  moveHeli();
  moveWalls();
  checkCollisions();

  //draw
  drawGame();
}

function moveHeli() {
  // Accelerate upward is mouse pressed
  if (keyIsPressed) {
    heli.speed += -1;
  }

  // apply gravtity
  heli.speed += heli.accel;

  //constrain speed
  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  //Move helicopter
  heli.y += heli.speed;
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}
let distance = 9;
let best = 0;
let speed = -3;
let move = 5;
let speed2 = 3;
let time = 150;
function moveWalls() {
  if (dpressed === true) {
    heli.x += move;
  } else if (apressed === true) {
    heli.x -= move;
  }

  // wall 1
  if (distance >= best) {
    best = distance;
    distance++;
    time--;
  } else {
    best = best;
    distance++;
    time--;
  }
  if (
    heli.x + heli.w >= wall1.x &&
    heli.x <= wall1.x + wall1.w &&
    heli.y + heli.h >= wall1.y &&
    heli.y <= wall1.y + wall1.h
  ) {
    gameOver();
  }
  if (
    heli.x + heli.w >= wall2.x &&
    heli.x <= wall2.x + wall2.w &&
    heli.y + heli.h >= wall2.y &&
    heli.y <= wall2.y + wall2.h
  ) {
    gameOver();
  }
  if (
    heli.x + heli.w >= wall3.x &&
    heli.x <= wall3.x + wall3.w &&
    heli.y + heli.h >= wall3.y &&
    heli.y <= wall3.y + wall3.h
  ) {
    gameOver();
  }
  if (
    heli.x + heli.w >= wall4.x &&
    heli.x <= wall4.x + wall4.w &&
    heli.y + heli.h >= wall4.y &&
    heli.y <= wall4.y + wall4.h
  ) {
    speed2++;
    wall4.x = Math.random() * 600;
    wall4.y = Math.random() * 300 + 200;
    time = 250;
    red = red + 255;
    setTimeout((red = red + 255), 2000);
  } else {
    red = 255;
  }
  if (time < -1) {
    time = 0;
    gameOver();
  }
  wall1.x -= speed;
  if (wall1.x + wall1.w > 1000) {
    wall1.x = wall1.x + -1000;
    wall1.y = Math.random() * 300 + 100;
  }
  if (heli.x + heli.w > 800) {
    heli.x = heli.x - 5;

    //heli.y = Math.random() * 300 + 100;
  }

  // wall 2
  wall2.x += speed;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 700;
    wall2.y = Math.random() * 300 + 100;
  }
  if (heli.x + heli.w < 80) {
    heli.x = heli.x + 5;

    // heli.y = Math.rndom() * 300 + 100;
  }
  // wall 3
  wall3.y += 0.2 * speed;
  if (wall3.y + wall3.h < 120) {
    wall3.y = wall3.y + 420;
    wall3.x = Math.random() * 600;

    // wall1.w = Math.random() * 100;
    // wall1.h = Math.random() * 200;
  }
  if (
    (wall2.x + wall2.w < 725 && wall2.x + wall2.w > 710) ||
    (wall2.x + wall2.w < 125 && wall2.x + wall2.w > 110)
  ) {
    green = green + 255;
  } else if (
    (wall1.x + wall1.w < 125 && wall1.x + wall1.w > 110) ||
    (wall1.x + wall1.w < 725 && wall1.x + wall1.w > 710)
  ) {
    green = green + 255;
  } else if (
    (wall3.y + wall3.h < 125 && wall3.y + wall3.h > 110) ||
    (wall3.y + wall3.h < 525 && wall3.y + wall3.h > 510)
  ) {
    green = green + 255;
  } else {
    green = 0;
  }

  if (speed <= -7.5) {
    speed = -7;
  }
  console.log("speed");
}

function gameOver() {
  explosion.play();
  state = "gameover";

  setTimeout(reset, 2);
  best = best;
  distance = 0;
  speed = -3;
  time = 250;
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
  best = best;
  distance = 0;
}

//helpet function
function reset() {
  state = "gameon";
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.7,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 20,
    h: 70,
  };

  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 70,
    h: 20,
  };

  wall3 = {
    x: Math.random() * 600,
    y: cnv.height - 150,
    w: 20,
    h: 70,
  };
  wall4 = {
    x: Math.random() * 600,
    y: cnv.height - 150,
    w: 20,
    h: 0,
  };
  best = best;
  distance = 0;
  green = 0;
  red = 0;
  time = 250;
  speed2 = 0;
}
let green = 0;
function drawWalls() {
  ctx.fillStyle = "rgb(" + green + "," + green + "," + green + ")";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  ctx.fillStyle = "rgb(" + green + "," + red + "," + green + ")";

  ctx.beginPath();
  ctx.arc(wall4.x, wall4.y, wall4.w, wall4.h, 2 * Math.PI);
  ctx.fill();
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "rgb(" + 0 + "," + 0 + "," + 00 + ")";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`TIME: ${time}`, 550, 35);
  ctx.fillText(`SCORE: ${speed2}`, 250, cnv.height - 15);

  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}
