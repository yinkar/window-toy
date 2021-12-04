class Window {
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
            fg: 'rgb(255, 255, 255)'
          }
        }
      }
    }
    
    this.isOnTop = false;
    
    this.images = [];
    
    this.buttons = [];
  }
  
  emojiToIcon(emoji) {
    return `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Ctext%20x='0'%20y='14'%3E${emoji}%3C/text%3E%3C/svg%3E`;
  }
  
  addImage(url, x, y, width, height) {
    this.images.push({
      url: url,
      x: x,
      y: y,
      width: width,
      height: height,
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
      action: action
    });
  }
  
}