class Entity implements Drawable {
    private home?: House;
    private work?: House;
    private position: p5.Vector;
    private readonly size = 10;

    constructor(position: p5.Vector) {
        this.position = position;
    }

    public getPosition(): p5.Vector { return this.position.copy().add(this.size / 2); }
    public hasHome(): boolean { return this.home !== undefined; }
    public hasWork(): boolean { return this.work !== undefined; }
    public setHome(home?: House): void { this.home = home; }
    public setWork(work?: House): void { this.work = work; }

    update(p: p5): void {
        if (this.home !== undefined) {
            const homePosition = this.home.getCenter();
            this.position = this.position.lerp(homePosition.x, homePosition.y, 0, 0.01);
        }
    }

    draw(p: p5): void {
        // Drawing the enity itself
        const size = 10;
        p.fill(p.color(0));
        p.rect(this.position.x, this.position.y, size, size);

        // Drawing it's way to work
        if (this.home !== undefined && this.work !== undefined) {
            const home = this.home.getCenter();
            const work = this.work.getCenter();

            p.strokeWeight(3);
            p.stroke(p.color(0));
            p.line(home.x, home.y, work.x, work.y)
        }
        p.strokeWeight(0);
    }
}
