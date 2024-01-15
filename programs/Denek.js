class Denek extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 280), y: random(windowHeight - 105),
            width: 280, height: 105,
            title: 'Denek',
            iconUrl: 'icons/space-invaders.png',
            content: '\n\tZaman yolcusu kalmasın'
        });

        this.addImage(`icons/rocket.png`, 200, 10, 40, 40);
    }
}