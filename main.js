let windowArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let el of document.getElementsByClassName('p5Canvas')) {
    el.addEventListener('contextmenu', e => e.preventDefault());
  }
  

  // Random Cat Photos
  windowArray.push(new AppWindow({
    x: random(windowWidth - 300), y: random(windowHeight - 220), 
    width: 300, height: 220, 
    title: 'Random Cat Photos',
    iconUrl: 'icons/cat.png',
    content: 'Use the button below to get a new photo'
  }));
  windowArray.at(-1).addButton(`Get New Photo`, 60, 145, 180, 25, (w) => {
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

  // Gariban Kedi
  windowArray.push(new AppWindow({
    x: random(windowWidth - 300), y: random(windowHeight - 330), 
    width: 300, height: 330, 
    title: 'Gariban Kedi',
    iconUrl: 'icons/cat2.png',
  }));
  windowArray.at(-1).addImage(
    `https://yinkar.github.io/pixelart/images/01-gariban-kedi.png`, 
    0, 
    0, 
    292, 
    290
  );
  windowArray.at(-1).addButton(`Test`, 100, 240, 100, 25, (w) => {       
    const icons = [
      'icons/cat.png',
      'icons/cat2.png',
      'icons/cat3.png',
      'icons/cat4.png',
      'icons/cube.png',
      'icons/paint.png',
      'icons/space-invaders.png',
      'icons/rocket.png',
      'icons/music.png',
    ];

    w.addImage(
      icons.at(
        int(random(0, icons.length))
      ).toString(), 
      random(0, 300 - 45), 
      random(90, 330) - 90, 
      ...Array(2).fill(random(20, 40))
    );
  
    w.images.at(-1).image = loadImage(w.images.at(-1).url);
    
    w.title = w.title.replace(
      /\s[0-9]+/g, 
      ''
    ) + ' ' + str(w.images.length - 1);
  });

  // Denek
  windowArray.push(new AppWindow({
    x: random(windowWidth - 280), y: random(windowHeight - 105), 
    width: 280, height: 105, 
    title: 'Denek',
    iconUrl: 'icons/space-invaders.png',
    content: '\n\tZaman yolcusu kalmasın'
  }));
  windowArray.at(-1).addImage(`icons/rocket.png`, 200, 10, 40, 40);
  
  // Random Cat Facts
  windowArray.push(new AppWindow({
    x: random(windowWidth - 500), y: random(windowHeight - 160),
    width: 500, height: 160,
    title: 'Random Cat Facts',
    iconUrl: 'icons/cat4.png',
    content: 'Use the button below to get a new fact'
  }));
  windowArray.at(-1).addButton(`Get New Fact`, 160, 85, 180, 25, (w) => {    
    fetch('https://meowfacts.herokuapp.com/')
      .then(r => r.json())
      .then(d => {
        let croppedData = d.data.toString().substring(0, 300).trim();
            
        if (croppedData.length < d.data.toString().length) {
          croppedData = `${croppedData}...`;
        }
      
        w.content = croppedData;
      });
  });

  // Dummy Paint
  windowArray.push(new AppWindow({
    x: random(windowWidth - 400), y: random(windowHeight - 440),
    width: 400, height: 440,
    title: 'Dummy Paint',
    iconUrl: 'icons/paint.png',
  }));
  windowArray.at(-1).addCanvas(0, 0, 392, 400, (c, w) => {
    c.background(255);
  }, (c, w) => {
    if (mouseIsPressed && w.zIndex === windowArray.length - 1 && !w.grabbed && !Object.values(w.sideClicks).some(e => e)) {
      if (mouseButton === LEFT) {
        c.stroke(0);
        c.strokeWeight(5);
      }
      else if (mouseButton === RIGHT) {
        c.stroke(255);
        c.strokeWeight(20);
      }
      c.strokeCap(ROUND);
      c.line(
        pmouseX - w.x - 4, 
        pmouseY - w.y - 36, 
        mouseX - w.x - 4, 
        mouseY - w.y - 36
      );
    }
  });

  // 3D Renderer
  windowArray.push(new AppWindow({
    x: random(windowWidth - 200), y: random(windowHeight - 240),
    width: 200, height: 200,
    title: '3D Renderer',
    iconUrl: 'icons/cube.png',
  }));
  windowArray.at(-1).addCanvas(0, 0, 192, 160, (c, w) => {
    w.vars.model = loadModel('teapot.obj');

    c.background(10);
  }, (c, w) => {
    c.background(10);

    c.normalMaterial();
    
    c.push();
    c.translate(0, 60, -10);
    c.rotateZ(PI * 3);
    c.rotateY(frameCount / 75);
    c.scale(24);
    c.model(w.vars.model);
    c.pop();
    
  }, true, () => {}, resizeHandler = (c, w) => {
    w.canvases.at(0).width = w.width - 8;
    w.canvases.at(0).height = w.height - 40;
    c.resizeCanvas(w.canvases.at(0).width, w.canvases.at(0).height);
  });

  // Music Player
  windowArray.push(new AppWindow({
    x: random(windowWidth - 230), y: random(windowHeight - 290),
    width: 230, height: 250,
    title: 'Music Player',
    iconUrl: 'icons/music.png'
  }));
  windowArray.at(-1).addCanvas(0, 90, 222, 120, (c, w) => {
    c.background(color('tomato'));

    w.vars.stateConsts = {
      PLAY: 0,
      PAUSE: 1,
      NO_SONG: 2
    };

    w.vars.state = w.vars.stateConsts.NO_SONG;

    w.vars.buttonState = () => {
      switch (w.vars.state) {
        case w.vars.stateConsts.PLAY:
          w.buttons.at(1).text = '  ⏸';
          break;
        case w.vars.stateConsts.PAUSE:
          w.buttons.at(1).text = '  ▶';
          break;
        case w.vars.stateConsts.NO_SONG:
          w.buttons.at(1).text = '  ▶';
          break;
      }
    };

    w.content = 'No song loaded.';

    w.vars.playerElement = document.createElement('audio');
    w.vars.playerElement.setAttribute('controls', true);
    w.vars.playerElement.classList.add('music-player');
    w.vars.playerElement.style.display = 'none';

    w.vars.sourceElement = document.createElement('source');

    w.vars.playerElement.appendChild(w.vars.sourceElement);

    document.body.appendChild(w.vars.playerElement);
    
    w.vars.songInput = document.createElement('input');
    w.vars.songInput.type = 'file';
    w.vars.songInput.classList.add('song-input');
    w.vars.songInput.accept = '.mp3,.wav,.ogg';
    w.vars.songInput.style.display = 'none';

    document.body.appendChild(w.vars.songInput);

    w.vars.bars = [];
    
    w.vars.songInput.addEventListener('change', (e) => {
      let reader = new FileReader();
      if (!(e.target.files.length > 0)) return;

      reader.readAsDataURL(e.target.files[0]);
  
      reader.onload = () => {
          const fileContent = reader.result;
          
          w.vars.song = fileContent;
          w.vars.mimeType = fileContent.split(';')[0].split(':')[1];
          w.vars.songName = e.target.files[0].name;

          w.vars.sourceElement.setAttribute('src', w.vars.song);
          w.vars.sourceElement.setAttribute('type', w.vars.mimeType);

          w.vars.playerElement.load();
          w.vars.playerElement.play();
          
          w.vars.state = w.vars.stateConsts.PLAY;
          w.vars.buttonState();

          w.content = (() => {
            if (w.vars.songName.toString().indexOf(' ') > 20 ||
                  (w.vars.songName.toString().length > 20 && 
                  w.vars.songName.toString().indexOf(' ') === -1)) {
              return w.vars.songName.toString()
                .substring(0, 20)
                .split(' ').at(0) + '...';
            }
            return w.vars.songName.toString().substring(0, 50);
          })();
          
          w.vars.bars = [];
          for (let i = 0; i < 44; i++) {
            w.vars.bars.push({
              x: i * 5 + 1,
              y: 0,
              width: 5,
              height: random(30, 100)
            });
          }
      }

    });
  }, (c, w) => {
    c.background(10);
    if (w.vars.state === w.vars.stateConsts.NO_SONG) return;

    w.vars.bars.forEach((b, i) => {
      c.fill(0, max((255 - i * 4), 10), 0);
      c.rect(b.x, 120 - b.y, b.width, -b.height);

      if (w.vars.state === w.vars.stateConsts.PLAY) {
        b.height = min(max(b.height + random(-15, 15), 30), 100);
      }
    });
  });
  windowArray.at(-1).addButton(`  📂`, 60, 50, 30, 25, (w) => {
    w.vars.songInput.click();
    w.vars.buttonState();
  });
  windowArray.at(-1).addButton(`  ▶`, 120, 50, 30, 25, (w) => {
    if (w.vars.state === w.vars.stateConsts.PAUSE) {
      w.vars.playerElement.play();
      w.vars.state = w.vars.stateConsts.PLAY;
    }
    else if (w.vars.state === w.vars.stateConsts.PLAY) {
      w.vars.playerElement.pause();
      w.vars.state = w.vars.stateConsts.PAUSE;
    }

    w.vars.buttonState();
  });

  
  windowArray.forEach((w, i) => {
    w.zIndex = i;
    if (![null, undefined, ''].includes(w.iconUrl)) {
      w.icon = loadImage(w.iconUrl);
    }
    
    w.images.forEach(e => {
      e.image = loadImage(e.url);
    });
    
    w.canvases.forEach(c => {
      if (c.isWebGl) {
        c.canvas = createGraphics(c.width, c.height, WEBGL);
      }
      else {
        c.canvas = createGraphics(c.width, c.height);
      }
      
      c.startHandler(c.canvas, w);
    });
  });
  
  windowArray.at(-1).isOnTop = true;
}

function draw() {
  cursor('https://raw.githubusercontent.com/keeferrourke/capitaine-cursors/master/src/svg/dark/default.svg');

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
    
    if (w.zIndex !== windowArray.length - 1) {
      stroke(color('rgba(255, 255, 255, .1)'));
    }
    
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
      image(w.icon, w.x + 8, w.y + 10, 16, 16);
    }
    else {
      stroke(120, 120, 120);
      fill(200, 200, 200);
      circle(w.x + 8, w.y + 11, 16);
    }

    noStroke();
    fill(color('rgba(200, 200, 200, 1)'));
    textFont('Inter');
    textSize(14);
    text(w.title, w.x + 30, w.y + 11);
    
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

    const whenResize = (w) => {
      w.canvases.forEach(c => {
        if (c.resizeHandler !== undefined) {
          c.resizeHandler(c.canvas, w);
        }
      });
    }

    // Refactoring needed
    
    if (w.sideClicks.left) {
      if (mouseX + w.initialDimensions.width < w.x + w.width) {
        w.width += (w.x - mouseX);
        w.x = mouseX;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.right) {
      if (mouseX - w.initialDimensions.width > w.x) {
        w.width = mouseX - w.x;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.down) {
      if (mouseY - w.initialDimensions.height > w.y) {
        w.height = mouseY - w.y;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.up) {
      if (mouseY + w.initialDimensions.height < w.y + w.height) {
        w.height += (w.y - mouseY);
        w.y = mouseY;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.upLeft) {
      if (
        mouseY + w.initialDimensions.height < w.y + w.height &&
        mouseX + w.initialDimensions.width < w.x + w.width
      ) {
        w.height += (w.y - mouseY);
        w.y = mouseY;
        w.width += (w.x - mouseX);
        w.x = mouseX;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.upRight) {
      if (
        mouseY + w.initialDimensions.height < w.y + w.height &&
        mouseX - w.initialDimensions.width > w.x
      ) {
        w.height += (w.y - mouseY);
        w.y = mouseY;
        w.width = mouseX - w.x;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.downLeft) {
      if (
        mouseY - w.initialDimensions.height > w.y &&
        mouseX + w.initialDimensions.width < w.x + w.width
      ) {
        w.height = mouseY - w.y;
        w.width += (w.x - mouseX);
        w.x = mouseX;
        whenResize(w);
      }
    }
    
    if (w.sideClicks.downRight) {
      if (
        mouseY - w.initialDimensions.height > w.y &&
        mouseX - w.initialDimensions.width > w.x
      ) {
        w.height = mouseY - w.y;
        w.width = mouseX - w.x;
        whenResize(w);
      }
    }
    
    if (
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
    ) {

      // Left
      if (
        mouseX > w.x - 0 &&
        mouseX < w.x + 5 &&
        mouseY > w.y + 0 &&
        mouseY < w.y + 0 + w.height
      ) {
        cursor('ew-resize');
      }

      // Right
      if (
        mouseX > w.x - 5 + w.width &&
        mouseX < w.x + 0 + w.width &&
        mouseY > w.y + 0 &&
        mouseY < w.y + 0 + w.height
      ) {
        cursor('ew-resize');
      }

      // Down
      if (
        mouseY > w.y - 5 + w.height &&
        mouseY < w.y + 0 + w.height &&
        mouseX > w.x + 0 &&
        mouseX < w.x + 0 + w.width
      ) {
        cursor('ns-resize');
      }

      // Up
      if (
        mouseY > w.y - 5 &&
        mouseY < w.y + 0 &&
        mouseX > w.x + 0 &&
        mouseX < w.x + 0 + w.width
      ) {
        cursor('ns-resize');
      }

      // Down Left
      if (
        mouseX > w.x - 0 &&
        mouseX < w.x + 5 &&
        mouseY > w.y - 5 + w.height &&
        mouseY < w.y + 0 + w.height
      ) {
        cursor('nesw-resize');
      }

      // Down Right
      if (
        mouseX > w.x - 5 + w.width &&
        mouseX < w.x + 0 + w.width &&
        mouseY > w.y - 5 + w.height &&
        mouseY < w.y + 0 + w.height
      ) {
        cursor('nwse-resize');
      }

      // Up Left
      if (
        mouseX > w.x - 0 &&
        mouseX < w.x + 5 &&
        mouseY > w.y - 0 &&
        mouseY < w.y + 5
      ) {
        cursor('nwse-resize');
      }

      // Up Right
      if (
        mouseX > w.x - 5 + w.width &&
        mouseX < w.x + 0 + w.width &&
        mouseY > w.y - 0 &&
        mouseY < w.y + 5
      ) {
        cursor('nesw-resize');
      }
    }


    if (w.titleButtons.closeButton.clicked) {
      closeButtonColor = w.titleButtons.closeButton.color.active;
    }

    noStroke();
    fill(color(closeButtonColor.bg));
    rect(w.x + w.width - 2 - 25, w.y + 7, 20, 20, 3);
    
    push();
    strokeWeight(3);
    stroke(color(closeButtonColor.fg));
    strokeCap(ROUND);
    line(w.x + w.width - 2 - 18, w.y + 14, w.x + w.width - 2 - 12, w.y + 20);
    line(w.x + w.width - 2 - 12, w.y + 14, w.x + w.width - 2 - 18, w.y + 20);
    pop();
    
    stroke('rgba(255, 255, 255, .1)');
    fill(color('rgba(20, 20, 20, 1)'));
    rect(w.x + 4, w.y + 36, w.width - 8, w.height - 8 - 32, 2);
    
    if (![null, undefined, ''].includes(w.content)) {      
      textSize(13);
      textFont('Inter');
      noStroke();
      fill(240);
      text(w.content, w.x + 12, w.y + 44, w.width - 18, w.height);
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
      rect(w.x + 4 + b.x, w.y + 35 + b.y, b.width, b.height, 2);
      push();
      noStroke();
      fill(color('rgba(210, 210, 210, .9)'));
      textAlign(CENTER);
      textFont('Inter');
      textSize(13);
      text(b.text, w.x + b.x + b.width / 2, w.y + 42 + b.y);
      pop();
    });
    
    w.canvases.forEach(c => {
      c.drawHandler(c.canvas, w);
      
      image(c.canvas,  w.x + 4 + c.x, w.y + 36 + c.y, c.width, c.height);
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
        mouseX > w.x - 4 &&
        mouseY > w.y - 4 &&
        mouseX < w.x + w.width + 4 &&
        mouseY < w.y + w.height + 4
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
        mouseY < w.y + 32 - 2
      ) {
        w.grabbed = true;
        w.clickedPoint = {
          x: mouseX - w.x,
          y: mouseY - w.y
        }
      }

      if (
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
      ) {
  
        // Left
        if (
          mouseX > w.x - 2 &&
          mouseX < w.x + 3 &&
          mouseY > w.y + 2 &&
          mouseY < w.y + 2 + w.height
        ) {
          w.sideClicks.left = true;
          w.grabbed = false;
        }
  
        // Right
        if (
          mouseX > w.x - 3 + w.width &&
          mouseX < w.x + 2 + w.width &&
          mouseY > w.y + 2 &&
          mouseY < w.y + 2 + w.height
        ) {
          w.sideClicks.right = true;
          w.grabbed = false;
        }
  
        // Down
        if (
          mouseY > w.y - 3 + w.height &&
          mouseY < w.y + 2 + w.height &&
          mouseX > w.x + 2 &&
          mouseX < w.x + 2 + w.width
        ) {
          w.sideClicks.down = true;
          w.grabbed = false;
        }
  
        // Up
        if (
          mouseY > w.y - 3 &&
          mouseY < w.y + 2 &&
          mouseX > w.x + 2 &&
          mouseX < w.x + 2 + w.width
        ) {
          w.sideClicks.up = true;
          w.grabbed = false;
        }
  
        // Down Left
        if (
          mouseX > w.x - 4 &&
          mouseX < w.x + 5 &&
          mouseY > w.y - 5 + w.height &&
          mouseY < w.y + 4 + w.height
        ) {
          w.sideClicks.downLeft = true;
          w.grabbed = false;
        }
  
        // Down Right
        if (
          mouseX > w.x - 5 + w.width &&
          mouseX < w.x + 4 + w.width &&
          mouseY > w.y - 5 + w.height &&
          mouseY < w.y + 4 + w.height
        ) {
          w.sideClicks.downRight = true;
          w.grabbed = false;
        }
  
        // Up Left
        if (
          mouseX > w.x - 4 &&
          mouseX < w.x + 5 &&
          mouseY > w.y - 4 &&
          mouseY < w.y + 5
        ) {
          w.sideClicks.upLeft = true;
          w.grabbed = false;
        }
  
        // Up Right
        if (
          mouseX > w.x - 5 + w.width &&
          mouseX < w.x + 4 + w.width &&
          mouseY > w.y - 4 &&
          mouseY < w.y + 5
        ) {
          w.sideClicks.upRight = true;
          w.grabbed = false;
        }
      }
  
    
      let maxZIndex = windowArray.length - 1;
            
      windowArray.filter(e => e.zIndex > w.zIndex).forEach(e => {
        e.zIndex--;
      });
      
      w.zIndex = maxZIndex;
      
      windowArray.forEach(e => e.isOnTop = false);
      w.isOnTop = true;

      w.canvases.forEach(c => {
        if (c.clickHandler !== undefined) {
          if (
            mouseX > w.x + c.x + 2 &&
            mouseX < w.x + c.x + c.width + 2 &&
            mouseY > w.y + c.y + 32 + 2 &&
            mouseY < w.y + c.y + c.height + 32 + 2
          ) {          
            c.clickHandler(c.canvas, w);
          }
        }
      });
    }

    if (
      mouseX > w.x + w.width - 2 - 25 &&
      mouseY > w.y + 7 &&
      mouseX < w.x + w.width - 2 - 25 + 20 &&
      mouseY < w.y + 7 + 20 &&
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
    ) {
      w.titleButtons.closeButton.clicked = true;
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

    w.sideClicks = {
      up: false,
      right: false,
      down: false,
      left: false,
      upLeft: false,
      upRight: false,
      downLeft: false,
      downRight: false
    };

    if (
      mouseX > w.x + w.width - 2 - 25 &&
      mouseY > w.y + 7 &&
      mouseX < w.x + w.width - 2 - 25 + 20 &&
      mouseY < w.y + 7 + 20 &&
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
      }) &&
      w.titleButtons.closeButton.clicked
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
  
    w.titleButtons.closeButton.clicked = false;
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}