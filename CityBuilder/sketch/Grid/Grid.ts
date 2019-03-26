interface Dimensions {
    position: p5.Vector;
    size: p5.Vector;
}

class Grid {
    private readonly objects: GridObject[] = [];

    addObject(gridObject: GridObject): boolean {
        if (this.canBuild(gridObject)) {
            this.objects.push(gridObject);
            return true;
        }
        return false;
    }

    canBuild(gridObject: GridObject): boolean {
        for (let obj of this.objects) {
            if (obj.overlaps(gridObject)) {
                return false;
            }
        }
        return true;
    }
}
