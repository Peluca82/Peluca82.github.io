// Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Tamaño del canvas
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// Tamaño máximo de las figuras
var maxFigureSize = 50;

// Función para generar un número aleatorio dentro de un rango
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para verificar la distancia entre dos puntos
function getDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Función para verificar si una posición está demasiado cerca de las figuras existentes
function isPositionTooClose(x, y) {
  for (var i = 0; i < occupiedPositions.length; i++) {
    var position = occupiedPositions[i];
    var distance = getDistance(x, y, position.x, position.y);
    if (distance < maxFigureSize) {
      return true;
    }
  }
  return false;
}

// Función para dibujar una figura en una posición aleatoria
function drawRandomFigure() {
  var figureWidth = getRandomNumber(10, maxFigureSize);
  var figureHeight = getRandomNumber(10, maxFigureSize);

  var maxAttempts = 100; // Límite de intentos para encontrar una posición no superpuesta

  for (var i = 0; i < maxAttempts; i++) {
    var x = getRandomNumber(0, canvasWidth - figureWidth);
    var y = getRandomNumber(0, canvasHeight - figureHeight);

    if (!isPositionTooClose(x, y)) {
      // Dibujar la figura en la posición aleatoria
      ctx.fillRect(x, y, figureWidth, figureHeight);

      // Almacenar la posición ocupada
      occupiedPositions.push({ x: x, y: y });
      break;
    }
  }
}

// Array para almacenar las posiciones ocupadas por las figuras
var occupiedPositions = [];

// Dibujar 10 figuras aleatorias
for (var i = 0; i < 10; i++) {
  drawRandomFigure();
}