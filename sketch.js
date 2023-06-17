
//https://youtu.be/mz7j_4N8XuY

//map(amplitud, amp_min, amp_max, 2, 20);      
//de acuerdo a la amplitud aumenta la velocidad, por ejemplo si hago ruidas bajos entonces va lento, si hago ruidos fuertes va rapido

//------TRAZOS-----
let arreglo = [];
let mascara = [];
let hay = 0;
const margen = 50; // Margen de distancia entre los trazos

//-------IMPRIMIR------
let font;
let IMPRIMIR = false;

//-------SONIDO------
let mic;
let amp;
let amp_min = 0.02;
let amp_max = 0.2;
let audioCotext;
let haySonido = false;
let antesHabiaSonido = false;

//-------COLORES-------
let celeste = 0;
let azul = 0;
let gris = 0;
let amarillo = 0;
let rosa = 0;
let azulF = 0;
let blanco = 0;

let gestorAmp;


//-----CLASIFICADOR-----
let classifier;
const options = {probabilityThreshold: 0.9};
let label;
let etiqueta;
let soundModel = 'https://teachablemachine.withgoogle.com/models/ef-dQhHiU/';

function preload() {
  //------FUENTE------
  font = loadFont('data/regular.otf');

  //-------CARGA DE TRAZOS Y RECTANGULOS-------
  for (let i = 0; i < 32; i++){
    let nombre = "data/trazo"+nf( i , 2 )+".png";
    arreglo[i] = loadImage(nombre);
    mascara.push (loadImage('data/rect.png'));
  }

  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(600, 800);
  background(255);                 
  imageMode(CENTER);
  hay = round(random(0,1));

  //------MIC------
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  gestorAmp = new gestorSenial(amp_min, amp_max);

  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  for (let i = 0; i < 32; i++){
    mascara[i].mask (arreglo[i]);
  }

  //-----CLASIFICADOR-----
  classifier.classify(gotResult);
}

function draw() {
  print(hay);

  //--------MICROFONO---------
  gestorAmp.actualizar(mic.getLevel()); 
  amp = gestorAmp.filtrada;
  haySonido = amp > amp_min;
  let empezoElSonido = amp > haySonido && !antesHabiaSonido;

  if(IMPRIMIR){
    printData();
  }

  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  let trazoRandom = mascara[int(random(mascara.length))];
    //------GENERAR VALORES PARA LAS POSICIONES X E Y CON UN MARGEN DE DISTANCIA ENTRE SI
    function generarValoresXY(width, height, margen) {
      const min_x = 100;
      const max_x = width - 100;
      const min_y = 200;
      const max_y = height - 200;

      // Generar un valor aleatorio para x dentro del rango
      const x = Math.random() * (max_x - min_x) + min_x;

      // Generar un valor aleatorio para y dentro del rango
      const y = Math.random() * (max_y - min_y) + min_y;

      // Aplicar el margen de distancia a los valores generados
      const margen_x =
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * margen);
      const margen_y =
        (Math.random() < 0.5 ? -1 : 1) * (Math.random() * margen);
      const x_con_margen = x + margen_x;
      const y_con_margen = y + margen_y;

      return { x: x_con_margen, y: y_con_margen };
    }

    // Ejemplo de uso
    const valoresXY = generarValoresXY(width, height, margen); //Este es el llamado de la función
    
  if(!IMPRIMIR){

    //-------GRIS-------
    if(gris <= 5 && haySonido){
      tint(143,169,186);
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        gris++;
      }

    //-------AMARILLO-------
    }else if(amarillo <= 3 && haySonido){
      tint(252,233,104);
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        amarillo++;
      }

    //-------CELESTE-------
    }else if(celeste <= 35 && haySonido){
      tint(52,168,215);
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        celeste++;
      }

    //-------ROSA-------
    }else if(rosa <= 2 && haySonido){
      tint(244,53,170);
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        rosa++;
      }

    //-------AZUL-------
    }else if(azul <= 25 && haySonido){
      tint(0,71,123); 
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        azul++;
      }

    //-------AZUL FUERTE-------
    }else if(hay == 1 && azulF <= 5 && haySonido){
      tint(1,10,178); 
      if (frameCount%5 == 0){
        image(trazoRandom, valoresXY.x, valoresXY.y);
        azulF++;
      }

    //-------BLANCO-------
    }else if(blanco <= 10 && haySonido){
      tint(255); 
      image(trazoRandom, valoresXY.x, valoresXY.y, 30, 150);
      blanco++;
    }
  }

  function windowResized() {
    resize(windowWidth,windowHeight);
  }

  antesHabiaSonido = haySonido;
  reset();

  function reset(){
    if(label == 'Chasquidos'){
      noStroke();
      rect(0,0,width, height)
      hay = round(random(0,1));
      celeste = 0;
      azul = 0;
      gris = 0;
      amarillo = 0;
      rosa = 0;
      azulF = 0;
      blanco = 0;
      label = '';
    }
  }
}

function keyPressed(){
  if(key == 'i'){
    IMPRIMIR = !IMPRIMIR;
  }

  if(IMPRIMIR){
    celeste = 0;
    azul = 0;
    gris = 0;
    amarillo = 0;
    rosa = 0;
  } else {
    noStroke();
    rect(0,0,width, height)
  }

  if(key == 'r'){
    hay = round(random(0,1));
    celeste = 0;
    azul = 0;
    gris = 0;
    amarillo = 0;
    rosa = 0;
    azulF = 0;
    blanco = 0;
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}