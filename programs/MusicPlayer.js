class MusicPlayer extends AppWindow {
    constructor() {
        super({
            x: random(windowWidth - 230), y: random(windowHeight - 290),
            width: 230, height: 250,
            title: 'Music Player',
            iconUrl: 'icons/music.png'
        });

        this.addCanvas(0, 90, 222, 120, (c, w) => {
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
        this.addButton(`  📂`, 60, 50, 30, 25, (w) => {
            w.vars.songInput.click();
            w.vars.buttonState();
        });
        this.addButton(`  ▶`, 120, 50, 30, 25, (w) => {
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
    }
}