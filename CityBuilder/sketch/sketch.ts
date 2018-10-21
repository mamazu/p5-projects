let sketch = (p: p5) => {
    let city: City;
    let statDiv: HTMLElement|null;

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
                const citizen = new Entity(mouse);
                city.addCitizen(citizen);
                break;
            case 'H':
                const house = new House(mouse, p.createVector(40, 40), 10);
                city.addHouse(house);
                break;
            case 'O':
                const office = new House(mouse, p.createVector(40, 40), 10, HouseType.Office);
                city.addHouse(office);
                break;
            default:
                console.log(p.key);
        }
    }

    p.draw = () => {
        p.background(100);

        city.update(p);
        city.draw(p);
        updateStatistics();
    };

    function updateStatistics(): void {
        if(statDiv === null){
            return;
        }

        statDiv.innerHTML = JSON.stringify(city.getStatistics());
    }
};

let sketchP = new p5(sketch);
