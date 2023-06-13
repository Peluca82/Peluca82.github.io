
//https://youtu.be/mz7j_4N8XuY

//map(amplitud, amp_min, amp_max, 2, 20);      
//de acuerdo a la amplitud aumenta la velocidad, por ejemplo si hago ruidas bajos entonces va lento, si hago ruidos fuertes va rapido

//------TRAZOS-----
let arreglo = [];
let mascara = [];
let hay = 0;

//-------IMPRIMIR------
let font;
let IMPRIMIR = false;

//-------SONIDO------
let mic;
let amp;
let amp_min = 0.01;
let haySonido = false;
let antesHabiaSonido = false;

//-------COLORES-------
let celeste = 0;
let azul = 0;
let gris = 0;
let amarillo = 0;
let rosa = 0;

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
  for (let i = 0; i < 32; i++) {
    mascara[i].mask(arreglo[i]);
  }
  //-------GESTOR DE SEÑAL-----------
  gestorAmp = new gestorSenial(amp_Min, amp_Max);

  //-----CLASIFICADOR-----
  classifier.classify(gotResult);
}

function draw() {
  print(hay);

  //--------MICROFONO---------
  amp = mic.getLevel(); 

  if(amp > amp_min){
    haySonido = true;
  } else {
    haySonido = false;
  }


  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  let trazoRandom = mascara[int(random(mascara.length))];            //ESTO ES PARA LA MASCARA
  //let trazoRandom = arreglo[int(random(arreglo.length))];

  print(amp);
  printData();

  if(cant <= 250){

    // CAMBIAR PARA NO SEA COMLETAMENTE ALEATORIO
    let x = random(100,width-100); 
    let y = random(200,height-200);
  if(!IMPRIMIR){

    //-------GRIS-------
    if(gris <= 5 && haySonido){
      tint(143,169,186);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        gris++;
      }

    //-------AMARILLO-------
    }else if(amarillo <= 3 && haySonido){
      tint(252,233,104);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        amarillo++;
      }

    //-------CELESTE-------
    }else if(celeste <= 35 && haySonido){
      tint(52,168,215);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        celeste++;
      }

    //-------ROSA-------
    }else if(rosa <= 2 && haySonido){
      tint(244,53,170);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        rosa++;
      }

    //-------AZUL-------
    }else if(azul <= 25 && haySonido){
      tint(0,71,123); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azul++;
      }

    //-------AZUL FUERTE-------
    }else if(hay == 1 && azulF <= 5 && haySonido){
      tint(1,10,178); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azulF++;
      }

    //-------BLANCO-------
    }else if(blanco <= 10 && haySonido){
      tint(255); 
      image(trazoRandom,x,y, 30, 150);
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
}