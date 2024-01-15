class RandomCatPhotos extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 300), y: random(windowHeight - 220),
            width: 300, height: 220,
            title: 'Random Cat Photos',
            iconUrl: 'icons/cat.png',
            content: 'Use the button below to get a new photo'
        });

        this.addButton(`Get New Photo`, 60, 145, 180, 25, (w) => {
            w.content = 'Loading...';

            w.images.splice(-1);

            w.addImage('https://cataas.com/cat/cute', 0, 0, 292, 180, 0, 0, 4672, 2880);

            w.images.at(-1).image = loadImage(
                w.images.at(-1).url,
                () => {
                    w.content = '';
                }
            );
        })
    }
}