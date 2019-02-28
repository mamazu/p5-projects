class Pathfinder {
    public findPath(start: p5.Vector, end: p5.Vector): Path {
        const path = new Path(start);
        path.addWayPoint(end);

        return path;
    }
}
