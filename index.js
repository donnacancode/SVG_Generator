const fs = require("fs");
const inquirer = require("inquirer");
const builder = require("svg-builder");

async function getUserInput() {
  const userQuestions = [
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters:",
    },
    {
      type: "input",
      name: "textcolor",
      message: "Enter a text color:",
    },
    {
      type: "list",
      name: "shape",
      message: "Pick a shape:",
      choices: ["Circle", "Triangle", "Square"],
    },
    {
      type: "input",
      name: "shapecolor",
      message: "Enter a shape color:",
    },
  ];

  return inquirer.prompt(userQuestions);
}

function createShape(shape, color) {
  switch (shape) {
    case "Circle":
      return builder.element("circle", {
        cx: 50,
        cy: 50,
        r: 40,
        fill: color,
      });
    case "Triangle":
      return builder.element("polygon", {
        points: "50, 15 90, 85 10, 85",
        fill: color,
      });
    case "Square":
      return builder.element("rect", {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        fill: color,
      });
    default:
      return "";
  }
}

function createText(text, color) {
  return builder
    .element("text", {
      x: 50,
      y: 55,
      "font-size": "30",
      "text-anchor": "middle",
      fill: color,
    })
    .text(text);
}

// Function to create the SVG
async function createSVG() {
  const answers = await getUserInput();

  // Build SVG
  const svgContent = builder.width(100).height(100).element("svg", {
    xmlns: "http:www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
  });
  append(createShape(answers.shape, answers.shapecolor));
  append(createText(answers.text, answers.textcolor)).build();

  // Save svg to file
  fs.writeFileSync("output.svg", svgContent);
  console.log("Here comes your SVG: output.svg");
}

// Run function to create SVG
createSVG();
