document.addEventListener("keydown", function (evento) {
  if (evento.keyCode == 32) {
    jump();

    if (level.dead == false) jump();
    else {
      level.velocidad = 9;
      level.dead = false;
      cloud.velocidad = 1;
      cactus.x = width + 100;
      level.point = 0;
      cloud.x = 400;
    }
  }
});

var imgRex, imgCloud, imgCactus, imgFloor;

function loadImage() {
  imgRex = new Image();
  imgCloud = new Image();
  imgCactus = new Image();
  imgFloor = new Image();
  imgRestart = new Image();

  imgRex.src = "img/rex.png";
  imgCloud.src = "img/cloud.png";
  imgCactus.src = "img/cactus.png";
  imgFloor.src = "img/floor.png";
  imgRestart.src = "img/restart.png";
}

const width = 700;
const height = 300;

var canvas, ctx;

function start() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  loadImage();
}

function deleteCanvas() {
  canvas.width = width;
  canvas.height = height;
}

const floor = 190;
const tRex = {
  y: floor,
  vy: 0,
  gravedad: 2,
  jump: 28,
  vymax: 9,
  jumping: false,
};
const level = { velocidad: 9, point: 0, dead: false };
const cactus = { x: width + 100, y: floor + 10 };
const cloud = { x: 400, y: 100, velocidad: 1 };
const floorG = { x: 0, y: floor + 30 };

function jump() {
  if (!tRex.jumping) {
    tRex.jumping = true;
    tRex.vy = tRex.jump;
  }
}

function gravedad() {
  if (tRex.jumping == true) {
    if (tRex.y - tRex.vy - tRex.gravedad > floor) {
      tRex.jumping = false;
      tRex.vy = 0;
      tRex.y = floor;
    } else {
      tRex.vy -= tRex.gravedad;
      tRex.y -= tRex.vy;
    }
  }
}

function drawRex() {
  ctx.drawImage(imgRex, 0, 0, 64, 69, 100, tRex.y, 50, 50);
}

function drawCactus() {
  ctx.drawImage(imgCactus, 0, 0, 38, 75, cactus.x, cactus.y - 30, 57, 90);
  ctx.drawImage(imgCactus, 0, 0, 38, 75, cactus.x + 220, cactus.y - 30, 57, 90);
}

function cactusLogic() {
  if (cactus.x < -100) {
    cactus.x = width + 100;
  } else {
    cactus.x -= level.velocidad;
  }
}

function drawCloud() {
  ctx.drawImage(imgCloud, 0, 0, 82, 31, cloud.x - 90, cloud.y, 82, 31);
  ctx.drawImage(imgCloud, 0, 0, 82, 31, cloud.x + 100, cloud.y + 30, 82, 31);
  ctx.drawImage(imgCloud, 0, 0, 82, 31, cloud.x + 200, cloud.y - 70, 82, 31);
  ctx.drawImage(imgCloud, 0, 0, 82, 31, cloud.x + 300, cloud.y - 20, 82, 31);
}

function cloudLogic() {
  if (cloud.x < -350) {
    cloud.x = width + 100;
  } else {
    cloud.x -= cloud.velocidad;
  }
}

function drawFloor() {
  ctx.drawImage(imgFloor, floorG.x, 0, 700, 30, 0, floorG.y, 700, 30);
}

function floorLogic() {
  if (floorG.x > 540) {
    floorG.x = 0;
  } else {
    floorG.x += level.velocidad;
  }
}

function collision() {
  //catus.x
  //tRex.y
  if (
    (cactus.x >= 100 && cactus.x <= 150) ||
    (cactus.x + 250 >= 100 && cactus.x + 250 <= 150)
  ) {
    if (tRex.y + 50 >= cactus.y - 30) {
      level.dead = true;
      level.velocidad = 0;
      cloud.velocidad = 0;
    } else {
      level.point++;
    }
  }
}

function points() {
  if (level.dead == false) {
    level.point++;
  }
  ctx.font = "30px impact"; //Establecer la fuente
  ctx.fillStyle = "#555555"; //Establecer el color
  ctx.fillText(`${level.point}`, 600, 50); //Escribir el texto

  if (level.dead == true) {
    ctx.font = "60px impact";
    ctx.fillStyle = "#555555"; //Establecer el color
    ctx.fillText(`GAME OVER`, 240, 100);
    ctx.font = "30px impact";
    ctx.fillText(`PRESS TO SPACE TO RESTART`, 205, 135);
  }
}

function difficult() {
  if (level.point == 500) {
    level.velocidad = 12;
  }
}

function drawRestart() {
  if (level.dead == true) {
    ctx.drawImage(imgRestart, 0, 0, 38, 75, 350, floor - 50, 57, 90);
  }
}

//Main bucle
var FPS = 50;

//El intervalo ejecuta una funcion cada x tiempo
setInterval(function () {
  main();
}, 1000 / FPS);

function main() {
  deleteCanvas();
  gravedad();
  collision();
  cloudLogic();
  drawCloud();
  cactusLogic();
  drawCactus();
  drawRex();
  floorLogic();
  drawFloor();
  points();
  difficult();
  drawRestart();
}
