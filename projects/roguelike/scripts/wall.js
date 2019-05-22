class Wall {
    constructor(v1, v2) {
        this.v1 = v1;
        this.v2 = v2;
    }

    intersects(pos, rad) {
        let dist = abs((this.v2.y - this.v1.y) * pos.x -
                (this.v2.x - this.v1.x) * pos.y +
                this.v2.x * this.v1.y - this.v2.y * this.v1.x) /
            sqrt(sq(this.v2.y - this.v1.y) + sq(this.v2.x - this.v1.x));
        if (dist <= rad) {
            return true;
        }
        return false;
    }

    show() {
        line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
    }
}
