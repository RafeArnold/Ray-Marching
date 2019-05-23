class Enemy {
    constructor(pos) {
        if (pos === undefined) {
            this.pos = createVector();
        } else {
            this.pos = pos;
        }
        this.angle = 0;
        this.rad = 10;
        this.color = 'gray';
        this.fov = HALF_PI;
    }

    update() {
        findPlayer();
    }

    findPlayer() {
        
    }

    show() {
        push();
        for (let rayAngle = 0; rayAngle < this.fov; rayAngle += TWO_PI / 200) {
            let ray = createVector(300, 0);
            ray.rotate(this.angle + rayAngle - this.fov / 2);
            ray.add(this.pos);
            line(this.pos.x, this.pos.y, ray.x, ray.y);
        }
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 2 * this.rad);
        pop();
    }
}
