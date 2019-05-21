let topLeft;
let zoom;
let maxIterations;
let set;
let topLeftOrigin;
let mouseOrigin;

function setup() {
    createCanvas(800, 600);
    // topLeft = createVector(- width / 2, - height / 2);
    topLeft = createVector(- 1200, - 400);
    zoom = 1000;
    maxIterations = 50;
    set = findSet();
}

function draw() {
    background(200);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            stroke(map(set[x][y], 0, 50, 255, 0));
            point(x, y);
        }
    }
    textAlign(RIGHT);
    text("(" + topLeft.x + ", " + topLeft.y + ")", width - 10, 20);
}

function findSet() {
    let temp = [];
    for (let x = 0; x < width; x++) {
        temp[x] = [];
        for (let y = 0; y < height; y++) {
            temp[x][y] = mandelbrot((topLeft.x + x) / zoom, (topLeft.y + y) / zoom);
        }
    }
    return temp;
}

//returns number of iterations before absolutely going over 2
function mandelbrot(a, b) {
    if (abs(a, b) > 2) {
        return 0;
    }
    let c = createVector(a, b);
    let totalSteps;
    let z = createVector(0, 0);
    for (totalSteps = 0; totalSteps < maxIterations && abs(z.x, z.y) <= 2; totalSteps++) {
        z.add(c);
        z = compSq(z.x, z.y);
    }
    return totalSteps;
}

function compSq(a, b) {
    return createVector(sq(a) - sq(b), 2 * a * b);
}

function abs(a, b) {
    return sqrt(sq(a), sq(b));
}

function mousePressed() {
    topLeftOrigin = topLeft.copy();
    mouseOrigin = createVector(mouseX, mouseY);
}

function mouseDragged() {
    topLeft.x = topLeftOrigin.x - (mouseX - mouseOrigin.x);
    topLeft.y = topLeftOrigin.y - (mouseY - mouseOrigin.y);
}

function mouseReleased() {
    set = findSet();
}

function mouseWheel(event) {
    zoom -= event.delta;
    set = findSet();
}
