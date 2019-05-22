let center;
let zoom;
let maxIterations;
let set;
let centerOrigin;
let mouseOrigin;

function setup() {
    createCanvas(800, 600);
    frameRate(1);
    center = createVector(0, 0);
    // center = createVector(- 1200, - 400);
    zoom = 250;
    set = findSet();
}

function draw() {
    background(200);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            stroke(map(set[x][y], 0, maxIterations, 255, 0));
            point(x, y);
        }
    }
	let textPos = createVector(width - 10, 20);
    textAlign(RIGHT);
	fill(map(set[textPos.x][textPos.y], 0, maxIterations, 0, 255));
	text("(" + center.x + ", " + center.y + ")", textPos.x, textPos.y);
    text(zoom, textPos.x, textPos.y + 20);
}

function findSet() {
	let topLeft = createVector(center.x - width / (2 * zoom), center.y - height / (2 * zoom));
    let temp = [];
    for (let x = 0; x < width; x++) {
        temp[x] = [];
        for (let y = 0; y < height; y++) {
            temp[x][y] = mandelbrot(topLeft.x + x / zoom, topLeft.y + y / zoom);
        }
    }
    return temp;
}

//returns number of iterations before absolutely going over 2
function mandelbrot(a, b) {
    if (abs(a, b) > 2) {
        return 0;
    }
	maxIterations = 10 * log(zoom);
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
    centerOrigin = center.copy();
    mouseOrigin = createVector(mouseX, mouseY);
}

function mouseDragged() {
    center.x = centerOrigin.x - (mouseX - mouseOrigin.x) / zoom;
    center.y = centerOrigin.y - (mouseY - mouseOrigin.y) / zoom;
}

function mouseReleased() {
    set = findSet();
}

function mouseWheel(event) {
    if (event.delta < 0) {
        zoom *= 2;
    } else {
        zoom /= 2;
    }
    set = findSet();
}
