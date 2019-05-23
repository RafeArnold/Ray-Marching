let player;
let keysHeld;
let walls;

function setup() {
    // frameRate(10);
    createCanvas(400, 400);
    player = new Player();
    keysHeld = [];
    walls = [
        new Wall(createVector(-150, -150), createVector(150, -150)),
        new Wall(createVector(150, -150), createVector(150, 150)),
        new Wall(createVector(-150, 150), createVector(150, 150)),
        new Wall(createVector(-150, -150), createVector(-150, 150))
    ];
}

function draw() {
    background(220);
    focusOnPlayer();

    walls.forEach(function(wall) {
        wall.show();
    });
    updatePlayer();

    exclaim();
}

let scale = 0;
let animationCount = 0;
let animationDuration = 60;

function exclaim() {
    push();
    fill('red');
    textAlign(CENTER);
    textSize(100 * scale);
    text('!', 0, 0);
    animationCount++;
    let firstDuration = 0.2 * animationDuration;
    let secondDuration = 0.3 * animationDuration;
    if (animationCount <= firstDuration) {
        scale = lerp(0, 1.2, animationCount / firstDuration);
    } else if (animationCount <= secondDuration) {
        scale = lerp(1.5, 1, (animationCount - firstDuration) / secondDuration);
    } else if (animationCount >= animationDuration) {
        animationCount = 0;
    }
    pop();
}

function updatePlayer() {
    player.update();
    player.show();
}

function focusOnPlayer() {
    translate(width / 2 - player.pos.x, height / 2 - player.pos.y);
}

function mousePressed() {
    player.shoot();
}

function keyPressed() {
    keysHeld.push(keyCode);
}

function keyReleased() {
    let index = keysHeld.indexOf(keyCode);
    keysHeld.splice(index, 1);
}
