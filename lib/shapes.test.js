// library/shapes.test.js
const { Circle, Triangle, Square } = require("./shapes");

describe("Shape classes", () => {
  test("Circle should generate correct SVG element", () => {
    const circle = new Circle("red");
    const shapeElement = circle.createShape();
    expect(shapeElement).toBe('<circle cx="100" cy="100" r="80" fill="red" />');
  });

  test("Triangle should generate correct SVG element", () => {
    const triangle = new Triangle("blue");
    const shapeElement = triangle.createShape();
    expect(shapeElement).toBe(
      '<polygon points="100,30 170,170 30,170" fill="blue" />'
    );
  });

  test("Square should generate correct SVG element", () => {
    const square = new Square("green");
    const shapeElement = square.createShape();
    expect(shapeElement).toBe(
      '<rect x="20" y="20" width="160" height="160" fill="green" />'
    );
  });

  test("Text should be created with correct attributes", () => {
    const circle = new Circle("red");
    const textElement = circle.createText("A", "black");
    expect(textElement).toContain('fill="black"');
    expect(textElement).toContain('font-size="80"');
    expect(textElement).toContain('text-anchor="middle"');
  });
});
