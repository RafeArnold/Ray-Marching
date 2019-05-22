class Player {
    constructor(pos) {
        if (pos === undefined) {
            this.pos = createVector();
        } else {
            this.pos = pos;
        }
        this.angle = 0;
        this.rad = 10;
        this.color = 'gray';
        this.speed = 2;
        this.bullets = [];
    }

    shoot() {
        this.bullets.push(new Bullet(this.pos, this.angle));
    }

    update() {
        this.pointAtMouse();
        this.move();
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i];
            bullet.update();
            if (bullet.dead) {
                this.bullets.splice(i, 1);
            }
        }
    }

    move() {
        for (let i = 0; i < this.speed; i++) {
            if (keysHeld.includes(LEFT_ARROW) || keysHeld.includes(65)) {
                this.pos.x--;
            }
            if (keysHeld.includes(UP_ARROW) || keysHeld.includes(87)) {
                this.pos.y--;
            }
            if (keysHeld.includes(RIGHT_ARROW) || keysHeld.includes(68)) {
                this.pos.x++;
            }
            if (keysHeld.includes(DOWN_ARROW) || keysHeld.includes(83)) {
                this.pos.y++
            }
        }
    }

    pointAtMouse() {
        let mouse = createVector(mouseX, mouseY);
        mouse.sub(width / 2, height / 2);
        this.angle = mouse.heading();
    }

    show() {
        push();
        this.bullets.forEach(function(bullet) {
            bullet.show();
        });
        strokeWeight(2);
        let vector = createVector(15, 0);
        vector.rotate(this.angle);
        vector.add(this.pos);
        line(this.pos.x, this.pos.y, vector.x, vector.y);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 2 * this.rad);
        pop();
    }
}
