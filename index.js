// index.js
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const { Circle, Triangle, Square } = require("./lib/shapes");

async function getUserInput() {
  const userQuestions = [
    {
      type: "input",
      name: "text",
      message: "Enter up to three characters:",
      validate: function (input) {
        return input.length <= 3 || "Text must be up to three characters.";
      },
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

// Function to create the SVG
async function createSVG() {
  const answers = await getUserInput();
  let shapeInstance;

  switch (answers.shape) {
    case "Circle":
      shapeInstance = new Circle(answers.shapecolor);
      break;
    case "Triangle":
      shapeInstance = new Triangle(answers.shapecolor);
      break;
    case "Square":
      shapeInstance = new Square(answers.shapecolor);
      break;
  }

  const shapeElement = shapeInstance.createShape();
  const textElement = shapeInstance.createText(answers.text, answers.textcolor);

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      ${shapeElement}
      ${textElement}
    </svg>
  `;

  // Generate a unique filename with formatted timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `output-${timestamp}.svg`;

  // Ensure the examples folder exists
  const examplesFolder = path.join(__dirname, "examples");
  if (!fs.existsSync(examplesFolder)) {
    fs.mkdirSync(examplesFolder);
  }

  // Full path for the file
  const filePath = path.join(examplesFolder, filename);

  // Save svg to file
  fs.writeFileSync(filePath, svgContent);
  console.log(`SVG file created: ${filePath}`);
}

// Run function to create SVG
createSVG();
