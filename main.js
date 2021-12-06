let windowArray;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  windowArray = [
    new AppWindow({
      x: random(windowWidth - 300), y: random(windowHeight - 220), 
      width: 300, height: 220, 
      title: 'Random Cat Photo',
      emojiIcon: '🐱‍🏍'
    }),
    new AppWindow({
      x: random(windowWidth - 300), y: random(windowHeight - 330), 
      width: 300, height: 330, 
      title: 'Gariban Kedi',
      emojiIcon: '🐈️'
    }),
    new AppWindow({
      x: random(windowWidth - 280), y: random(windowHeight - 105), 
      width: 280, height: 105, 
      title: 'Denek',
      emojiIcon: '👾',
      content: 'Zaman yolcusu kalmasın'
    }),
    new AppWindow({
      x: random(windowWidth - 300), y: random(windowHeight - 200), 
      width: 300, height: 200, 
      title: 'Tost Makinesi',
      emojiIcon: '🐱‍👤'
    }),
    new AppWindow({
      x: random(windowWidth - 500), y: random(windowHeight - 160),
      width: 500, height: 160,
      title: 'Random Cat Facts',
      emojiIcon: '😼',
      content: 'Use "Get" button to get new fact'
    })
  ];
   windowArray[1].addImage(`https://yinkar.github.io/pixelart/images/01-gariban-kedi.png`, 0, 0, 292, 290);
  
  windowArray[3].addImage(`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E💣️%3C/text%3E%3C/svg%3E`, 60, 20, 140, 140);
  
  windowArray[1].addButton(`Test`, 100, 240, 100, 25, (w) => {       
    const emojis = [...'🚗🚲🛴🚿🌒🌡☄🔥'];
       w.addImage(`data:image/svg+xml,\
%3Csvg%20xmlns='http://www\
.w3.org/2000/svg'%20viewBox='0%200%\
2020%2020'%3E%3Ctext%20x='0'%20\
y='14'%3E${(
         emojis.at(
           int(random(0, emojis.length))
         )
       )}%3C/text%3E%3C/svg%3E`, 
        random(0, w.width - 45), 
        random(90, w.height) - 90, 
        ...Array(2).fill(random(20, 40))
       );
    
    
    w.images.at(-1).image = loadImage(w.images.at(-1).url);
    
    w.title = w.title.replace(
      /\s[0-9]+/g, 
      ''
    ) + ' ' + str(w.images.length - 1);
  });
  
  
  windowArray[0].addButton(`Get New Photo`, 60, 145, 180, 25, (w) => {
    w.content = 'Loading...';
    
    fetch('https://thatcopy.pw/catapi/rest/')
      .then(r => r.json())
      .then(d => {
        w.images.splice(-1);
      
        w.addImage(d.url, 0, 0, 292, 180, 0, 0, 4672, 2880);

        w.images.at(-1).image = loadImage(
          w.images.at(-1).url, 
          () => {
            w.content = '';
          }
        );
      });
  });
  
  windowArray[4].addButton(`Get New Fact`, 160, 85, 180, 25, (w) => {    
    fetch('https://meowfacts.herokuapp.com/')
      .then(r => r.json())
      .then(d => {
        let croppedData = d.data.toString().substring(0, 200).trim();
            
        if (croppedData.length < d.data.toString().length) {
          croppedData = `${croppedData}...`;
        }
      
        w.content = croppedData;
      });
  });
   windowArray[2].addImage(`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E🚀%3C/text%3E%3C/svg%3E`, 40, 20, 40, 40);
  
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
  background(35);
  
  textAlign(LEFT, TOP);
  ellipseMode(CORNER);
  
  windowArray.forEach(w => {
    push();
    drawingContext.shadowOffsetX = 3;
    drawingContext.shadowOffsetY = 3;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.9)';
    stroke(color('rgba(255, 255, 255, .15)'));
    fill(color('rgba(0, 0, 0, .5)'));
    rect(w.x, w.y, w.width, w.height, 2);
    pop();

    stroke(color('rgba(255, 255, 255, .1)'));
    fill(color('rgba(0, 0, 0, .5)'));
    
    if (w.zIndex !== windowArray.length - 1) {
      fill(color('rgba(50, 50, 50, .5)'));      
    }
    
    rect(w.x + 2, w.y + 2, w.width - 4, 32 - 2, 2);

    if (![null, undefined, ''].includes(w.icon)) {
      image(w.icon, w.x + 8, w.y + 9, 16, 16);
    }
    else {
      stroke(120, 120, 120);
      fill(200, 200, 200);
      circle(w.x + 8, w.y + 9, 16);
    }

    noStroke();
    fill(color('rgba(200, 200, 200, 1)'));
    textFont('monospace');
    textSize(18);
    text(w.title, w.x + 30, w.y + 9);
    
    let closeButtonColor = w.titleButtons.closeButton.color.normal;
    
    if (
      mouseX > w.x + w.width - 2 - 25 &&
      mouseY > w.y + 6 &&
      mouseX < w.x + w.width - 2 - 25 + 20 &&
      mouseY < w.y + 6 + 20 &&
      (
        (w.zIndex === windowArray.length - 1) ||
        (
          ![
            ...windowArray.slice(0, windowArray.indexOf(w)), 
            ...windowArray.slice(windowArray.indexOf(w) + 1)
          ].some(e => {
            return (
              mouseX > e.x &&
              mouseY > e.y &&
              mouseX < e.x + e.width &&
              mouseY < e.y + e.height &&
              e.zIndex > w.zIndex
            )
          })
        )
      )
    ) {
      closeButtonColor = w.titleButtons.closeButton.color.hover;
    }

    noStroke();
    fill(color(closeButtonColor.bg));
    rect(w.x + w.width - 2 - 25, w.y + 6, 20, 20, 3);
    
    push();
    strokeWeight(3);
    stroke(color(closeButtonColor.fg));
    strokeCap(ROUND);
    line(w.x + w.width - 2 - 18, w.y + 13, w.x + w.width - 2 - 12, w.y + 19);
    line(w.x + w.width - 2 - 12, w.y + 13, w.x + w.width - 2 - 18, w.y + 19);
    pop();
    
    stroke('rgba(255, 255, 255, .1)');
    fill(color('rgba(20, 20, 20, 1)'));
    rect(w.x + 4, w.y + 36, w.width - 8, w.height - 8 - 32, 2);
    
    if (![null, undefined, ''].includes(w.content)) {      
      textSize(14);
      textFont('monospace');
      noStroke();
      fill(240);
      text(w.content, w.x + 12, w.y + 44, w.width - 8, w.height);
    }
    
    w.images.forEach(e => {
      if (
        e.sX !== undefined && e.sY !== undefined &&
        e.sWidth !== undefined && e.sHeight !== undefined
      ) {      
        image(
          e.image, 
          w.x + 4 + e.x, 
          w.y + 36 + e.y, 
          e.width, 
          e.height,
          e.sX,
          e.sY,
          e.sWidth,
          e.sHeight
         );
      }
      else {
        image(e.image, w.x + 4 + e.x, w.y + 36 + e.y, e.width, e.height);
      }
    });
    
    w.buttons.forEach(b => {
      stroke(color('rgba(255, 255, 255, .1)'))
      fill(color('rgba(40, 40, 40, 1)'));
      if (
        mouseX > w.x + b.x + 4 &&
        mouseY > w.y + b.y + 36 &&
        mouseX < w.x + b.x + 4 + b.width &&
        mouseY < w.y + b.y + 36 + b.height && 
        (
          (w.zIndex === windowArray.length - 1) ||
          (
            ![
              ...windowArray.slice(0, windowArray.indexOf(w)), 
              ...windowArray.slice(windowArray.indexOf(w) + 1)
            ].some(e => {
              return (
                mouseX > e.x &&
                mouseY > e.y &&
                mouseX < e.x + e.width &&
                mouseY < e.y + e.height &&
                e.zIndex > w.zIndex
              )
            })
          )
        )
      ) {
        fill(color('rgba(70, 70, 70, .9)'));
      }
      rect(w.x + 4 + b.x, w.y + 36 + b.y, b.width, b.height, 2);
      push();
      noStroke();
      fill(color('rgba(210, 210, 210, .9)'));
      textAlign(CENTER);
      textFont('monospace');
      textSize(16);
      text(b.text, w.x + b.x + b.width / 2, w.y + 42 + b.y);
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
      (
        mouseX > w.x &&
        mouseY > w.y &&
        mouseX < w.x + w.width &&
        mouseY < w.y + w.height
      ) &&
      !(
        mouseX > w.x + w.width - 2 - 25 &&
        mouseY > w.y + 6 &&
        mouseX < w.x + w.width - 2 - 25 + 20 &&
        mouseY < w.y + 6 + 20
      ) &&
      (
        (w.zIndex === windowArray.length - 1) ||
        (
          ![
            ...windowArray.slice(0, windowArray.indexOf(w)), 
            ...windowArray.slice(windowArray.indexOf(w) + 1)
          ].some(e => {
            return (
              mouseX > e.x &&
              mouseY > e.y &&
              mouseX < e.x + e.width &&
              mouseY < e.y + e.height &&
              e.zIndex > w.zIndex
            )
          })
        )
      )
    ) {
      if (
        mouseX > w.x + 2 &&
        mouseY > w.y + 2 &&
        mouseX < w.x + w.width - 4 &&
        mouseY < w.y + 32 - 4
      ) {
          w.grabbed = true;
          w.clickedPoint = {
            x: mouseX - w.x,
            y: mouseY - w.y
          }
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
        b.action(w);
      }
    });
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}