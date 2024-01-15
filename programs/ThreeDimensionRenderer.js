class ThreeDimensionRenderer extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 200), y: random(windowHeight - 240),
            width: 200, height: 200,
            title: '3D Renderer',
            iconUrl: 'icons/cube.png',
        });

        this.addCanvas(0, 0, 192, 160, (c, w) => {
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

        }, true, () => { }, (c, w) => {
            w.canvases.at(0).width = w.width - 8;
            w.canvases.at(0).height = w.height - 40;
            c.resizeCanvas(w.canvases.at(0).width, w.canvases.at(0).height);
        });
    }
}