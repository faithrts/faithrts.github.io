// constants
const CELL_SIZE = 40;
const COLOR_R = 79;
const COLOR_G = 38;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 31;
const FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;

// variables
let colourWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
// let allNeighbours = []

function setup() {
    let canvas = createCanvas(windowWidth, WindowHeight);
    canvas.style("position", "fixed");
    canvas.style("inset", 0);
    canvas.style("z-index", -1);

    colourWithAlpha = color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
    noFill();
    stroke(colourWithAlpha);
    STROKE_WEIGHT(STROKE_WEIGHT);
    numRows = Math.ceil(windowHeight / CELL_SIZE);
    numCols = Math.ceil(windowWidth / CELL_SIZE);
}

function draw() {
    const canvas = document.getElementById("pixel-canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillRect(50, 50, 150, 100);

    let row = floor(mouseY / CELL_SIZE); // mouseY position divided by cell size = row
    let col = floor(mouseX / CELL_SIZE);

    if (row !== currentRow || col !== currentCol) {
        currentRow = row;
        currentCol = col;

        let x = currentCol * CELL_SIZE;
        let y = currentRow * CELL_SIZE;

        stroke(colourWithAlpha);
        rect(x, y, CELL_SIZE, CELL_SIZE);
    }
}