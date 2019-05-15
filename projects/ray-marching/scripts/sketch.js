let startPos;
let barriers;
let points;
let angle;
let speedSlider;
let play;
let playCheckbox;
let mouseActive;
let mouseActiveCheckbox;

function setup() {
    createCanvas(800, 400);
    startPos = createVector(width/2, height/2);
    barriers = [];
    points = [];
    angle = 0;
    for (let i = 0; i < 5; i++) {
        barriers.push(new Barrier(createVector(random(0, width), random(0, height)), createVector(random(0, width), random(0, height))));
    }
    speedSlider = createSlider(500, 5000, 2000);
    speedSlider.position(80, height + 30);
    play = true;
    playCheckbox = createCheckbox('play', true);
    playCheckbox.changed(function() {
        play = !play;
    });
    playCheckbox.position(220, height + 30);
    mouseActive = false;
    mouseActiveCheckbox = createCheckbox('mouse', false);
    mouseActiveCheckbox.changed(function() {
        mouseActive = !mouseActive;
        playCheckbox.position(220, mouseActive ? -50 : height + 30);
    });
    mouseActiveCheckbox.position(10, height + 30);
}

function draw() {
    background(200);
    for (barrier of barriers) {
        barrier.show();
    }
    for (p of points) {
        push();
        stroke(255);
        strokeWeight(2);
        point(p.x, p.y);
        pop();
    }
    let dir;
    if (mouseActive) {
        const mouse = createVector(mouseX, mouseY);
        dir = lineVector(startPos, mouse);
    } else {
        dir = p5.Vector.fromAngle(angle);
    }
    rayMarch(startPos.copy(), dir);
    if (!mouseActive && play) {
        angle += TWO_PI / speedSlider.value();
    }
}

function rayMarch(start, dir) {
    let record;
    let closest;
    const limit = max(width, height);
    const end = p5.Vector.add(start, dir.setMag(limit));
    line(start.x, start.y, end.x, end.y);
    do {
        const closestResult = closestBarrierPoint(start);
        closest = closestResult[0];
        record = closestResult[1];
        push();
        noFill();
        circle(start.x, start.y, 2 * record);
        pop();
        start.add(dir.setMag(record));
    } while (record < limit && record > 1);
    if (play && record <= 1) {
        points.push(closest);
        if (points.length > 1000) {
            points.splice(0, 1);
        }
    }
}

function closestBarrierPoint(pos) {
    let closest;
    let record = Infinity;
    for (barrier of barriers) {
        let point = closestPoint(pos, barrier);
        let dist = p5.Vector.dist(pos, point);
        if (dist < record) {
            record = dist;
            closest = point;
        }
    }
    return [closest, record];
}

function closestPoint(pos, barrier) {
    const vector = lineVector(barrier.v1, barrier.v2);
    const a = vector.y;
    const b = -vector.x;
    const c = lineIntercept(barrier.v1, barrier.v2);
    x = (b * (b * pos.x - a * pos.y) - a * c) / (sq(a) + sq(b));
    y = (a * (a * pos.y - b * pos.x) - b * c) / (sq(a) + sq(b));
    let x1Smallest = barrier.v1.x < barrier.v2.x;
    let y1Smallest = barrier.v1.y < barrier.v2.y;
    x = constrain(x, x1Smallest ? barrier.v1.x : barrier.v2.x, !x1Smallest ? barrier.v1.x : barrier.v2.x);
    y = constrain(y, y1Smallest ? barrier.v1.y : barrier.v2.y, !y1Smallest ? barrier.v1.y : barrier.v2.y);
    return createVector(x, y);
}

function lineVector(v1, v2) {
    return p5.Vector.sub(v2, v1);
}

function lineIntercept(v1, v2) {
    return barrier.v2.x * barrier.v1.y - barrier.v2.y * barrier.v1.x;
}
