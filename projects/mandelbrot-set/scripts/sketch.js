let center;
let centerOrigin;
let mouseOrigin;
let boxPos;

function setup() {
    createCanvas(1200, 600);
    center = createVector(width / 2, height / 2);
    boxPos = createVector(width / 2, height / 2);
}

function draw() {
    background(200);
    push();
    textAlign(RIGHT);
    text("(" + center.x + ", " + center.y + ")", width - 10, 20);
    translate(center.x - width / 2, center.y - height / 2);
    rect(boxPos.x, boxPos.y, 10, 10);
    pop();
}

function mousePressed() {
    centerOrigin = center.copy();
    mouseOrigin = createVector(mouseX, mouseY);
}

function mouseDragged() {
    center.x = centerOrigin.x + (mouseX - mouseOrigin.x);
    center.y = centerOrigin.y + (mouseY - mouseOrigin.y);
}

function mouseWheel(event) {
    console.log(event.delta);
}
