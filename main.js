let windowArray;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  windowArray = [
    new Window({
      x: 30, y: 30, 
      width: 300, height: 330, 
      title: 'Gariban Kedi',
      emojiIcon: '🐈️'
    }),
    new Window({
      x: 280, y: 280, 
      width: 280, height: 105, 
      title: 'Denek',
      emojiIcon: '👾',
      content: 'Zaman yolcusu kalmasın'
    }),/*
    new Window({
      x: 100, y: 350, 
      width: 300, height: 200, 
      title: 'Tost Makinesi',
      emojiIcon: '🐱‍👤'
    })*/
  ];
   windowArray[0].addImage(`https://yinkar.github.io/pixelart/images/01-gariban-kedi.png`, 0, 0, 292, 290);
  
//  windowArray[2].addImage(`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E💣️%3C/text%3E%3C/svg%3E`, 60, 20, 140, 140);
  
  windowArray[0].addButton(`Test`, 100, 240, 100, 25, () => {
    alert('OK');
  });
   windowArray[1].addImage(`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E🚀%3C/text%3E%3C/svg%3E`, 40, 20, 40, 40);
  
  windowArray.forEach((w, i) => {
    w.zIndex = i;
    if (![null, undefined, ''].includes(w.iconUrl)) {
      w.icon = loadImage(w.iconUrl);
    }
    
    w.images.forEach(e => {
      e.image = loadImage(e.url);
    });
  });
  
  windowArray.at(-1).isOnTop = true;
}

function draw() {
  background(20);
  
  textAlign(LEFT, TOP);
  ellipseMode(CORNER);
  
  windowArray.forEach(w => {
    stroke(150, 150, 220);
    fill(100, 100, 200);
    rect(w.x, w.y, w.width, w.height, 2);

    stroke(120, 120, 220);
    fill(90, 90, 200);
    rect(w.x + 2, w.y + 2, w.width - 4, 32 - 4, 2);

    if (![null, undefined, ''].includes(w.icon)) {
      image(w.icon, w.x + 8, w.y + 8, 16, 16);
    }
    else {
      stroke(120, 120, 220);
      fill(120, 120, 230);
      circle(w.x + 8, w.y + 8, 16);
    }

    noStroke();
    fill(200, 200, 255);
    textFont('monospace');
    textSize(20);
    text(w.title, w.x + 30, w.y + 7);
    
    let closeButtonColor = w.titleButtons.closeButton.color.normal;
    
    if (
      mouseX > w.x + w.width - 2 - 25 &&
      mouseY > w.y + 6 &&
      mouseX < w.x + w.width - 2 - 25 + 20 &&
      mouseY < w.y + 6 + 20 &&
      (!windowArray.find(e => {
        return (e !== w &&
        mouseX > e.x &&
        mouseY > e.y &&
        mouseX < e.x + e.width &&
        mouseY < e.y + e.height)
      }))
    ) {
      closeButtonColor = w.titleButtons.closeButton.color.hover;
    }

    noStroke();
    fill(color(closeButtonColor.bg));
    rect(w.x + w.width - 2 - 25, w.y + 6, 20, 20, 3);
    fill(color(closeButtonColor.fg));
    textSize(24);
    textFont('cursive');
    text('x', w.x + w.width - 2 - 22, w.y + 4);
    
    stroke(160, 160, 220);
    fill(120, 120, 220);
    rect(w.x + 4, w.y + 36, w.width - 8, w.height - 8 - 32, 2);
    
    if (![null, undefined, ''].includes(w.content)) {
      textSize(12);
      textFont('sans-serif');
      noStroke();
      fill(0);
      text(w.content, w.x + 8, w.y + 40);
    }
    
    w.images.forEach(e => {
      image(e.image, w.x + 4 + e.x, w.y + 36 + e.y, e.width, e.height);
    });
    
    w.buttons.forEach(b => {
      fill(80, 80, 160);
      if (
        mouseX > w.x + b.x + 4 &&
        mouseY > w.y + b.y + 36 &&
        mouseX < w.x + b.x + 4 + b.width &&
        mouseY < w.y + b.y + 36 + b.height && 
        (!windowArray.find(b => {
          return (b !== w &&
          mouseX > b.x &&
          mouseY > b.y &&
          mouseX < b.x + b.width &&
          mouseY < b.y + b.height)
        }) || w.zIndex === windowArray.length - 1)
      ) {
        fill(120, 120, 200);
      }
      rect(w.x + 4 + b.x, w.y + 36 + b.y, b.width, b.height);
      push();
      noStroke();
      fill(200, 200, 255);
      textAlign(CENTER);
      textFont('monospace');
      textSize(20);
      text(b.text, w.x + b.x + b.width / 2, w.y + 40 + b.y);
      pop();
    });
  });
  
  windowArray.forEach(w => {
    if (w.grabbed) {
      w.x = mouseX - w.clickedPoint.x;
      w.y = mouseY - w.clickedPoint.y;
    }
  });
}

function mousePressed() {
  if (windowArray.find(e => e.grabbed)) return;
  
  windowArray.forEach((w, i) => {
    if (
      mouseX > w.x + 2 &&
      mouseY > w.y + 2 &&
      mouseX < w.x + w.width - 4 &&
      mouseY < w.y + 32 - 4 &&
      (!windowArray.find(e => {
        return (e !== w &&
        mouseX > e.x &&
        mouseY > e.y &&
        mouseX < e.x + e.width &&
        mouseY < e.y + e.height)
      }) || w.zIndex === windowArray.length - 1) &&
      !(
        mouseX > w.x + w.width - 2 - 25 &&
        mouseY > w.y + 6 &&
        mouseX < w.x + w.width - 2 - 25 + 20 &&
        mouseY < w.y + 6 + 20
      )
    ) {
      w.grabbed = true;
      w.clickedPoint = {
        x: mouseX - w.x,
        y: mouseY - w.y
      }
      
      let maxZIndex = windowArray.length - 1;
            
      windowArray.filter(e => e.zIndex > w.zIndex).forEach(e => {
        e.zIndex--;
      });
      
      w.zIndex = maxZIndex;
      
      windowArray.forEach(e => e.isOnTop = false);
      w.isOnTop = true;
    }
  });

  windowArray.sort((a, b) => {
    if (a.zIndex < b.zIndex) return -1; 
    if (a.zIndex > b.zIndex) return 1; 
    return 0;
  });
}

function mouseReleased() {
  windowArray.forEach((w, i) => {
    w.grabbed = false;
    
    if (
      mouseX > w.x + w.width - 2 - 25 &&
      mouseY > w.y + 6 &&
      mouseX < w.x + w.width - 2 - 25 + 20 &&
      mouseY < w.y + 6 + 20
    ) {
      windowArray.splice(i, 1);
      windowArray.forEach((e, i) => e.zIndex = i);
      return;
    }
    
    w.buttons.forEach(b => {
      if (
        mouseX > w.x + b.x + 4 &&
        mouseY > w.y + b.y + 36 &&
        mouseX < w.x + b.x + 4 + b.width &&
        mouseY < w.y + b.y + 36 + b.height && 
        (!windowArray.find(b => {
          return (b !== w &&
          mouseX > b.x &&
          mouseY > b.y &&
          mouseX < b.x + b.width &&
          mouseY < b.y + b.height)
        }) || w.zIndex === windowArray.length - 1)
      ) {
        b.action();
      }
    });
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}