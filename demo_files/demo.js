// This is a sample file to demonstrate various AST nodes
// It includes common programming constructs and patterns

// Variable declarations
const PI = 3.14159;
let radius = 5;
var oldStyleVar = "deprecated";

// Function declaration
function calculateArea(r) {
    return PI * r * r;
}

// Arrow function
const calculateCircumference = (r) => 2 * PI * r;

// Class declaration with properties and methods
class Circle {
    constructor(radius, color = "red") {
        // Private field using closure
        this._radius = radius;
        this.color = color;
    }

    get area() {
        return calculateArea(this._radius);
    }

    setRadius(newRadius) {
        if (newRadius > 0) {
            this._radius = newRadius;
        }
    }
}

// Control flow statements
function processShape(shape) {
    if (shape.area() > 100) {
        return "Large shape";
    } else if (shape.area() > 50) {
        return "Medium shape";
    } else {
        return "Small shape";
    }
}

// Switch statement
function getShapeType(shape) {
    switch (shape.constructor.name) {
        case "Circle":
            return "Round shape";
        case "Square":
            return "Angular shape";
        default:
            return "Unknown shape";
    }
}

// Loops
function printNumbers() {
    // For loop
    for (let i = 0; i < 5; i++) {
        console.log(i);
    }

    // While loop
    let count = 0;
    while (count < 3) {
        console.log(count);
        count++;
    }

    // For...of loop
    const numbers = [1, 2, 3, 4, 5];
    for (const num of numbers) {
        console.log(num);
    }
}

// Try-catch block
function safeDivide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero");
        }
        return a / b;
    } catch (error) {
        console.error("Error:", error);
        return 0;
    }
}

// Template literals
const message = `The circle with radius ${radius} has area ${calculateArea(radius)}`;

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Object literal with methods
const mathUtils = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: safeDivide
};

// Export statement
export {
    Circle,
    calculateArea,
    calculateCircumference,
    mathUtils
};
