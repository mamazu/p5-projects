class Path {
    private waypoints: p5.Vector[] = [];

    constructor(start: p5.Vector) {
        this.waypoints.push(start);
    }

    public getWayPoints(): p5.Vector[] {
        return this.waypoints;
    }
}
