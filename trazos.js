function trazos(trazoRandom,x,y) {

  //-----TRAZOS DE LOS BORDES-----
  if(bordes <= 0 && haySonido && label == 'RUIDO'){
    for(let i = 0; i <= 16; i++){
      let colorR = int(random(0,5));
      tint(colores[colorR][0], colores[colorR][1], colores[colorR][2]);
      image(mascara[int(random(0,9))], puntosX[i], puntosY[i]);
      bordes++;
    }
  }

    //-------GRIS-------
    if(bordes >= 16 && gris <= 5 && haySonido && label == 'A'){
      tint(143,169,186);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        gris++;
      }

    //-------AMARILLO-------
    } if(gris >= 5 && amarillo <= 3 && haySonido && label == 'E'){
      tint(252,233,104);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        amarillo++;
      }

    //-------CELESTE-------
    } if(amarillo >= 3 && celeste <= 35 && haySonido && label == 'I'){
      tint(52,168,215);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        celeste++;
      }

    //-------ROSA-------
    } if(celeste >= 35 && rosa <= 2 && haySonido && label == 'O'){
      tint(244,53,170);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        rosa++;
      }

    //-------AZUL-------
    } if(rosa >= 2 && azul <= 25 && haySonido && label == 'U'){
      tint(0,71,123); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azul++;
      }

    //-------BLANCO-------
    } if(azul >= 25 && hay == 0 && haySonido && blanco <= 10){
      tint(255); 
      image(trazoRandom,x,y, 30, 150);
      blanco++;
     
    //-------AZUL FUERTE-------  
    } if(azul >= 25 && hay == 1 && azulF <= 5 && haySonido && label == 'M'){
      tint(1,10,178); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azulF++;
      }

    //-------BLANCO-------
    } if(azulF >= 5 && hay == 1 && blanco <= 10 && haySonido){
      tint(255); 
      image(trazoRandom,x,y, 30, 150);
      blanco++;
    }

    if(blanco >= 10 && label == 'RUIDO'){
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


