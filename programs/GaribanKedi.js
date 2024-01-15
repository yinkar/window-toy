class GaribanKedi extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 300), y: random(windowHeight - 330),
            width: 300, height: 330,
            title: 'Gariban Kedi',
            iconUrl: 'icons/cat2.png',
        });

        this.addImage(
            `https://yinkar.github.io/pixelart/images/01-gariban-kedi.png`,
            0,
            0,
            292,
            290
        );

        this.addButton(`Test`, 100, 240, 100, 25, (w) => {
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
    }
}
