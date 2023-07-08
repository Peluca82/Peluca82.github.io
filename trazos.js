function trazos(trazoRandom,x,y) {

  //-----TRAZOS DE LOS BORDES-----
  if(bordes <= 0){
    for(let i = 0; i <= 16; i++){
      let colorR = int(random(0,5));
      tint(colores[colorR][0], colores[colorR][1], colores[colorR][2]);
      image(mascara[int(random(0,9))], puntosX[i], puntosY[i]);
      bordes++;
    }
  }

  if(!IMPRIMIR){
    //-------GRIS-------
    if(gris <= 5 && label == 'AAAAAA'){
      tint(143,169,186);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        gris++;
      }

    //-------AMARILLO-------
    } if( gris >= 5 && amarillo <= 3 && label == 'EEEEEE'){
      tint(252,233,104);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        amarillo++;
      }

    //-------CELESTE-------
    } if(amarillo >= 3 && celeste <= 35 && haySonido){
      tint(52,168,215);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        celeste++;
      }

    //-------ROSA-------
    } if(celeste >= 35 && rosa <= 2 && haySonido){
      tint(244,53,170);
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        rosa++;
      }

    //-------AZUL-------
    } if(rosa >= 2 && azul <= 25 && haySonido){
      tint(0,71,123); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azul++;
      }

    //-------AZUL FUERTE-------
    } if(azul >= 25 && hay == 1 && azulF <= 5 && haySonido){
      tint(1,10,178); 
      if (frameCount%5 == 0){
        image(trazoRandom,x,y);
        azulF++;
      }

    //-------BLANCO-------
    } if((azul>= 25 || azulF >= 5) && blanco <= 10 && haySonido){
      tint(255); 
      image(trazoRandom,x,y, 30, 150);
      blanco++;
    }
  }
}
