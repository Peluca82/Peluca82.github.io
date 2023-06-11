
//https://youtu.be/mz7j_4N8XuY
//Hola xd
let arreglo = [];
let mascara = [];
let cant = 0;
let miVelocidadYDireccion;
let gestor;

//--------SONIDO-------
let img1;

//-------IMPRIMIR------
let font;
let IMPRIMIR = true;

//-------MICROFONO------
let mic;
let amp;
let amp_min = 0.01;
let haySonido = false;

//-------COLORES-------
let celeste = 0;
let azul = 0;
let gris = 0;
let amarillo = 0;
let rosa = 0;

function preload() {
  font = loadFont('data/regular.otf');
  //-------CARGA DE TRAZOS Y RECTANGULOS-------
  for (let i = 0; i < 32; i++){
    let nombre = "data/trazo"+nf( i , 2 )+".png";
    arreglo[i] = loadImage(nombre);
    mascara.push (loadImage('data/rect.png'));
  }

}

function setup() {
  miVelocidadYDireccion = new Dir_y_Vel();

  createCanvas(600, 800);
  background(255);                 
  imageMode(CENTER);

  // MIC
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio();

  //-------DIRECCION Y INTERACCION-------
  miVelocidadYDireccion = new Dir_y_Vel();
  gestor = new GestorDeInteracion();

  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  for (let i = 0; i < 32; i++){
    mascara[i].mask (arreglo[i]);
  }

}

function draw() {
  //--------MICROFONO---------
  amp = mic.getLevel(); 

  if(amp > amp_min){
    haySonido = true;
  } else {
    haySonido = false;
  }

  //-------DIRECCION Y INTERACCION-------
  miVelocidadYDireccion.calcularTodo(mouseX, mouseY);
  let velocidad = miVelocidadYDireccion.velocidad();
  gestor.actualizar();
  
  //-------APLICACION DE MASCARA A LOS RECTANGULOS-------
  let trazoRandom = mascara[int(random(mascara.length))];            //ESTO ES PARA LA MASCARA
  //let trazoRandom = arreglo[int(random(arreglo.length))];

  print(amp);
  printData();

  if(cant <= 250){

    // CAMBIAR PARA NO SEA COMLETAMENTE ALEATORIO
    let x = random(100,width-100); 
    let y = random(200,height-200);

    //-------USAR COLOR CELESTE-------
    if(celeste <= 10 && haySonido){//-------------------celeste
      tint(52,168,215);

      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        cant = cant + 1;
        celeste++;
      }

    //-------USAR COLOR AZUL-------
    } else if(azul <= 10 && haySonido){//-------------azul
      gestor.reset();
      tint(0,71,123); 

      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        cant = cant + 1;
        azul++;
      }

    //-------USAR COLOR GRIS-------
    }else if(gris <= 5 && haySonido){//--------------gris
      gestor.reset();
      tint(143,169,186);

      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        cant = cant + 1;
        gris++;
      }

    //-------USAR COLOR AMARILLO-------
    }else if(amarillo <= 3 && haySonido){//--------------amarillo
      gestor.reset();
      tint(252,233,104);

      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        cant = cant + 1;
        amarillo++;
      }

    //-------USAR COLOR ROSA-------
    }else if(rosa <= 2 && haySonido){//--------------rosa
      gestor.reset();
      tint(244,53,170);

      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        cant = cant + 1;
        rosa++;
      }
    }
  }
  function windowResized() {
    resize(windowWidth,windowHeight);
  }
}