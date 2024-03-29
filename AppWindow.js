class AppWindow {
    constructor(params) {
        let {
            x, y,
            width, height,
            title,
            iconUrl,
            emojiIcon,
            content
        } = params;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.iconUrl = iconUrl;
        this.content = content;

        if (![null, undefined, ''].includes(emojiIcon)) {
            this.iconUrl = this.emojiToIcon(emojiIcon);
        }

        this.icon = null;

        this.grabbed = false;

        this.clickedPoint = {
            x: 0,
            y: 0
        }

        this.windowModeSize = {
            x: 0,
            y: 0
        }

        this.zIndex = 0;

        this.titleButtons = {
            closeButton: {
                color: {
                    normal: {
                        bg: 'rgb(190, 50, 50)',
                        fg: 'rgb(255, 160, 160)'
                    },
                    hover: {
                        bg: 'rgb(220, 70, 70)',
                        fg: 'rgb(255, 230, 230)'
                    },
                    active: {
                        bg: 'rgb(220, 90, 90)',
                        fg: 'rgb(255, 255, 255)'
                    }
                },
                clicked: false
            }
        }

        this.isOnTop = false;

        this.images = [];
        this.buttons = [];
        this.canvases = [];
        this.vars = {};

        this.sideClicks = {
            up: false,
            right: false,
            down: false,
            left: false,
            upRight: false,
            upDown: false,
            downRight: false,
            downLeft: false
        };

        this.initialDimensions = {
            width: this.width,
            height: this.height
        };

    }

    emojiToIcon(emoji) {
        return `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E${emoji}%3C/text%3E%3C/svg%3E`;
    }

    addImage(url, x, y, width, height, sX, sY, sWidth, sHeight) {
        this.images.push({
            url: url,
            x: x,
            y: y,
            width: width,
            height: height,
            sX: sX,
            sY: sY,
            sWidth: sWidth,
            sHeight: sHeight,
            image: null
        });
    }

    addButton(text, x, y, width, height, action) {
        this.buttons.push({
            text: text,
            x: x,
            y: y,
            width: width,
            height: height,
            action: action.bind(this)
        });
    }

    addCanvas(
        x,
        y,
        width,
        height,
        startHandler,
        drawHandler,
        isWebGl,
        clickHandler,
        resizeHandler
    ) {
        this.canvases.push({
            x: x,
            y: y,
            width: width,
            height: height,
            startHandler: startHandler,
            drawHandler: drawHandler,
            isWebGl: isWebGl,
            clickHandler: clickHandler,
            resizeHandler: resizeHandler
        });
    }
}