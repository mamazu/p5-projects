class GridObject {
    protected readonly position: p5.Vector;
    protected readonly size: p5.Vector;

    constructor(position: p5.Vector, size: p5.Vector) {
        this.position = position;
        this.size = size;
    }

    getDimensions(): Dimensions {
        return { 'position': this.position, 'size': this.size };
    }

    overlaps(other: GridObject): boolean {
        const otherDimensions = other.getDimensions();

        if (this.position.x + this.size.x < otherDimensions.position.x || otherDimensions.position.x + otherDimensions.size.x < this.position.x) {
            return false;
        }

        if (this.position.y > otherDimensions.position.y || otherDimensions.position.y > this.position.y + this.size.y) {
            return false;
        }
        return true;
    }
}