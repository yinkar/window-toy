let windowArray = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let el of document.getElementsByClassName('p5Canvas')) {
        el.addEventListener('contextmenu', e => e.preventDefault());
    }

    windowArray.push(
        new RandomCatPhotos(),
        new GaribanKedi(),
        new Denek(),
        new RandomCatFacts(),
        new DummyPaint(),
        new ThreeDimensionRenderer(),
        new MusicPlayer(),
    );

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

            const setCursor = (x1, x2, y1, y2, cursorName) => {
                if (
                    mouseX > w.x + x1 &&
                    mouseX < w.x + x2 &&
                    mouseY > w.y + y1 &&
                    mouseY < w.y + y2
                ) {
                    cursor(cursorName)
                }
            };

            // Left
            setCursor(0, 5, 0, w.height, 'ew-resize');

            // Right
            setCursor(-5 + w.width, w.width, 0, w.height, 'ew-resize');

            // Down
            setCursor(0, w.width, -5 + w.height, w.height, 'ns-resize');

            // Up
            setCursor(0, w.width, -5, 0, 'ns-resize');

            // Down Left
            setCursor(0, 5, -5 + w.height, w.height, 'nesw-resize');

            // Down Right
            setCursor(-5 + w.width, w.width, -5 + w.height, w.height, 'nwse-resize');

            // Up Left
            setCursor(0, 5, 0, 5, 'nwse-resize');

            // Up Right
            setCursor(-5 + w.width, w.width, 0, 5, 'nesw-resize');
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

            image(c.canvas, w.x + 4 + c.x, w.y + 36 + c.y, c.width, c.height);
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

                const setGrabbed = (x1, x2, y1, y2, dir) => {
                    if (
                        mouseX > w.x + x1 &&
                        mouseX < w.x + x2 &&
                        mouseY > w.y + y1 &&
                        mouseY < w.y + y2
                    ) {
                        w.sideClicks[dir] = true;
                        w.grabbed = false;
                    }
                };

                // Left
                setGrabbed(-2, 3, 2, 2 + w.height, 'left');

                // Right
                setGrabbed(-3 + w.width, 2 + w.width, 2, 2 + w.height, 'right');

                // Down
                setGrabbed(2, 2 + w.width, -3 + w.height, 2 + w.height, 'down');

                // Up
                setGrabbed(2, 2 + w.width, -3, 2, 'up');

                // Down Left
                setGrabbed(-4, 5, -5 + w.height, 4 + w.height, 'downLeft');

                // Down Right
                setGrabbed(-5, 4, -5 + w.height, 4 + w.height, 'downRight');

                // Up Left
                setGrabbed(-4, 5, -4, 5, 'upLeft');

                // Up Right
                setGrabbed(-5 + w.width, 4 + w.width, -4, 5, 'upRight');
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