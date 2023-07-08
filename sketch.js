
//https://youtu.be/mz7j_4N8XuY

//------TRAZOS-----
let arreglo = [];
let mascara = [];

let trazosBordes = [];
let puntosX = [];
let puntosY = [];

let hay = 0;
let bordes = 0;

//-------IMPRIMIR------
let font;
let IMPRIMIR = false;

//-------SONIDO------
let mic;
let amp;
let amp_min = 0.01;
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


let colores = [];
colores[0] = new Array(143, 169, 186);
colores[1] = new Array(252, 233, 104);
colores[2] = new Array(52, 168, 215);
colores[3] = new Array(244, 53, 170);
colores[4] = new Array(0, 71, 123);
colores[5] = new Array(1, 10, 178);


let gestorAmp;


//-----CLASIFICADOR-----
let classifier;
let label;
let etiqueta;
let soundModel = 'https://teachablemachine.withgoogle.com/models/Y6K_St6yu/';

function preload() {
  //------FUENTE------
  font = loadFont('data/regular.otf');

  //-------CARGA DE TRAZOS Y RECTANGULOS-------
  for (let i = 0; i < 9; i++){
    let nombre = "data/trazo"+nf( i , 2 )+".png";
    let nombreM = "data/rect"+nf( i , 2 )+".png";
    arreglo[i] = loadImage(nombre);
    mascara.push (loadImage(nombreM));
  }

  classifier = ml5.soundClassifier(soundModel + 'model.json');

  puntosX[0] = 180;
  puntosX[1] = 270;
  puntosX[2] = 350;
  puntosX[3] = 420;
  puntosX[4] = 460;
  puntosX[5] = 460;
  puntosX[6] = 460;
  puntosX[7] = 460;
  puntosX[8] = 180;
  puntosX[9] = 270;
  puntosX[10] = 350;
  puntosX[11] = 420;
  puntosX[12] = 130;
  puntosX[13] = 130;
  puntosX[14] = 130;
  puntosX[15] = 130;

  puntosY[0] = 140;
  puntosY[1] = 140;
  puntosY[2] = 140;
  puntosY[3] = 140;
  puntosY[4] = 240;
  puntosY[5] = 350;
  puntosY[6] = 450;
  puntosY[7] = 550;
  puntosY[8] = 645;
  puntosY[9] = 645;
  puntosY[10] = 645; 
  puntosY[11] = 645;
  puntosY[12] = 240;
  puntosY[13] = 350;
  puntosY[14] = 450;
  puntosY[15] = 550;
}

function setup() {
  createCanvas(600, 800);
  background(255);                 
  imageMode(CENTER);

  //-----RANDOM PARA QUE HAYA O NO TRAZOS AZULES FUERTES-----
  hay = round(random(0,1));

  //------MIC------
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();
  gestorAmp = new gestorSenial(amp_min, amp_max);

  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  for (let i = 0; i < 9; i++){
    mascara[i].mask (arreglo[i]);
  }

  //-----CLASIFICADOR-----
  classifier.classify(gotResult);
}

function draw() {
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

  //-----POSICION DE LOS TRAZOS-----
    let x = random(125,width-125); 
    let y = random(225,height-225);
  
  //-----DIBUJAR TRAZOS-----  
  trazos(trazoRandom,x,y,bordes);

  antesHabiaSonido = haySonido;

  reset();
  windowResized();
}

function windowResized() {
  resize(windowWidth,windowHeight);
}

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
    bordes = 0;
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
}