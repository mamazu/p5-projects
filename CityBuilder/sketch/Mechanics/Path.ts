class Path {
    private way_points: p5.Vector[] = [];

    constructor(start: p5.Vector) {
        this.way_points.push(start);
    }

    public getWayPoints(): p5.Vector[] {
        return this.way_points;
    }

    public addWayPoint(way_point: p5.Vector): void {
        this.way_points.push(way_point);
    }
}
