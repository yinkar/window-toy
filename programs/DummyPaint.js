class DummyPaint extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 400), y: random(windowHeight - 440),
            width: 400, height: 440,
            title: 'Dummy Paint',
            iconUrl: 'icons/paint.png',
        });

        this.addCanvas(0, 0, 392, 400, (c, w) => {
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
    }
}