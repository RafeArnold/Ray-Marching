class Bullet {
    constructor(pos, angle) {
        this.pos = pos.copy();
        this.rad = 3;
        this.angle = angle;
        this.speed = 5;
        this.dead = false;
    }

    update() {
        let delta = createVector(1, 0);
        delta.rotate(this.angle);
        for (let i = 0; i < this.speed; i++) {
            this.pos.add(delta);
        }
        walls.forEach(function(wall) {
            if (wall.intersects(this.pos, this.rad)) {
                this.dead = true;
            }
        }, this);
    }

    show() {
        ellipse(this.pos.x, this.pos.y, 2 * this.rad);
    }
}
