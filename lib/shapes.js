// shapes.js
class Shape {
  constructor(color) {
    this.color = color;
  }

  createText(text, color) {
    const fontSize = text.length === 1 ? 80 : text.length === 2 ? 60 : 50;
    return `<text x="100" y="${this.textYPosition()}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle" fill="${color}">${text}</text>`;
  }

  textYPosition() {
    return 110;
  }
}

class Circle extends Shape {
  createShape() {
    return `<circle cx="100" cy="100" r="80" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  createShape() {
    return `<polygon points="100,30 170,170 30,170" fill="${this.color}" />`;
  }

  textYPosition() {
    return 140;
  }
}

class Square extends Shape {
  createShape() {
    return `<rect x="20" y="20" width="160" height="160" fill="${this.color}" />`;
  }
}

module.exports = {
  Circle,
  Triangle,
  Square,
};