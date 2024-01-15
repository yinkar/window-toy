class RandomCatFacts extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 500), y: random(windowHeight - 160),
            width: 500, height: 160,
            title: 'Random Cat Facts',
            iconUrl: 'icons/cat4.png',
            content: 'Use the button below to get a new fact'
        });

        this.addButton(`Get New Fact`, 160, 85, 180, 25, (w) => {
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
    }
}