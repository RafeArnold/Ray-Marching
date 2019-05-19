let xLeft;
let xRight;
let yTop;
let yBottom;
let mouseOrigin;

function setup() {
    createCanvas(1200, 600);
    xLeft = - width / 2;
    xRight = width / 2;
    yTop = - height / 2;
    yBottom = height / 2;
}

function draw() {
    background(200);
    push();
    textAlign(RIGHT);
    text("(" + xLeft + ", " + xRight + ") x", width - 10, 20);
    text("(" + yTop + ", " + yBottom + ") y", width - 10, 40);
    pop();
}

function mousePressed() {
    mouseXOrigin = mouseX;
    mouseYOrigin = mouseY;
}

function mouseDragged() {
}
