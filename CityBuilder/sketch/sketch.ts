let sketch = (p: p5) => {
    let city: City;
    let statDiv: HTMLElement | null;

    p.setup = () => {
        p.createCanvas(700, 700);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);

        city = new City();
        statDiv = document.getElementById('stats');
    };

    p.keyPressed = () => {
        const mouse = p.createVector(p.mouseX, p.mouseY);
        switch (p.key) {
            case 'E':
            case 'e':
                const citizen = new Entity(mouse);
                city.addCitizen(citizen);
                break;
            case 'H':
            case 'h':
                const house = new House(mouse, p.createVector(40, 40), 10);
                city.addHouse(house);
                break;
            case 'O':
            case 'o':
                const office = new House(mouse, p.createVector(40, 40), 10, HouseType.Office);
                city.addHouse(office);
                break;
            default:
                console.error(`No mapping defined for key: ${p.key}`);
        }
    }

    p.draw = () => {
        p.background(100);

        city.update(p);
        city.draw(p);
        updateStatistics();
    };

    function updateStatistics(): void {
        if (statDiv === null) {
            return;
        }

        const stats: CityStatistics = city.getStatistics();
        statDiv.innerHTML = renderStatistics(stats, 1);
    }

    function renderStatistics(stats: any, index: number): string {
        const header = p.min(index, 6);
        let content = '';
        for (let prop in stats) {
            let value = stats[prop]
            if (typeof value === 'object') {
                content += `
                <div>
                    <h${header}>${prop}</h${header}>
                    <div>${renderStatistics(value, index + 1)}</div>
                </div>`;
            } else {
                content += `<div>${prop}: ${stats[prop]}</div>`;
            }
        }

        return content;
    }
};

let sketchP = new p5(sketch);
