interface Dimensions {
    position: pVector;
    size: pVector;
}

interface GridObject
{
    getDimensions(): Dimensions;
    overlaps(gridObject: GridObject): boolean;
}

class Grid {
    private readonly objects: GridObject[] = [];

    addObject(gridObject: GridObject): boolean {
        for(let obj of this.objects) {
            if(obj.overlaps(gridObject)){
                console.log([obj, gridObject])
                return false;
            }
            console.log('Free to build');
        }
        this.objects.push(gridObject);
        return true;
    }
}
