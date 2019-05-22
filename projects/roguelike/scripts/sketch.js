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
