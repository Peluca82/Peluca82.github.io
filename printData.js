function printData(){
  push();
  //
  let textString = 'Señal filtrada: ' + amp;
  fill(255);
  noStroke();
  rect(0,0,width,height);
  fill(0);
  stroke (0);
  textFont(font);
  textSize(30);
  text(textString, 10, 30);
  ellipse(width/2, height-amp * 3000, 30, 30);
  //
  pop();

  gestorAmp.dibujar(width/6,100);
}