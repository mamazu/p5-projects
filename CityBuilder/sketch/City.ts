interface CityStatistics {
    houseStats: object;
    citizenStats: object;
};

class City implements Drawable {
    private houses: House[] = [];
    private citizens: Entity[] = [];
    private readonly houseFinder = new HouseFinder();
    private readonly grid: Grid;

    constructor() {
        this.grid = new Grid();

        this.addHouse(new House(
            sketchP.createVector(30, 30),
            sketchP.createVector(40, 40),
            5
        ));
        this.addHouse(new House(
            sketchP.createVector(230, 200),
            sketchP.createVector(40, 40),
            1
        ));
        this.addHouse(new House(
            sketchP.createVector(330, 300),
            sketchP.createVector(40, 40),
            10,
            HouseType.Office
        ));

        this.addCitizen(new Entity(sketchP.createVector(330, 300)))
        this.addCitizen(new Entity(sketchP.createVector(330, 300)))
    }

    getGrid(): Grid { return this.grid; }

    addHouse(house: House): void {
        if (this.grid.addObject(house)) {
            this.houses.push(house);
        }
        this.recalculate();
    }

    recalculate(): void {
        for (let citizen of this.citizens) {
            if (!citizen.hasHome()) {
                const home = this.findHouse(citizen.getPosition(), HouseType.Home);
                if (home !== undefined) {
                    citizen.setHome(home);
                    home.addInhabitant(citizen);
                }
            }
            if (!citizen.hasWork()) {
                const office = this.findHouse(citizen.getPosition(), HouseType.Office);
                if (office !== undefined) {
                    citizen.setWork(office);
                    office.addInhabitant(citizen);
                }
            }
        }
    }

    removeHouse(house: House): void {
        house.removeAllInhabitants();
        this.houses = this.houses.filter(h => h !== house);
    }

    addCitizen(citizen: Entity): void {
        this.citizens.push(citizen);

        const home = this.findHouse(citizen.getPosition(), HouseType.Home);
        if (home !== undefined) {
            citizen.setHome(home);
            home.addInhabitant(citizen);
        }

        const office = this.findHouse(citizen.getPosition(), HouseType.Office);
        if (office !== undefined) {
            citizen.setWork(office);
            office.addInhabitant(citizen);
        }
    }

    findHouse(position: p5.Vector, houseType: HouseType): House | undefined {
        return this.houseFinder.findClosestAvailableHouse(
            this.houses,
            position,
            (house) => house.getType() === houseType
        );
    }

    getStatistics(): CityStatistics {
        // Getting statistics about houses
        let houseStatistics: { [index: string]: number } = {};
        this.houses.forEach(house => {
            const houseType = houseTypePrinter(house.getType());
            houseStatistics[houseType] = (houseStatistics[houseType] || 0) + 1
        });

        let houseLoad = 0;
        this.houses.forEach(house => {
            houseLoad += house.getLoad();
        });
        houseStatistics['average house load'] = houseLoad / this.houses.length;

        let citizenStats = {
            'all': 0,
            'unemployed': 0,
            'homeless': 0
        };
        this.citizens.forEach(citizen => {
            citizenStats.all += 1;
            if (!citizen.hasHome()) {
                citizenStats.homeless += 1;
            }
            if (!citizen.hasWork()) {
                citizenStats.unemployed += 1;
            }
        });

        let stats: CityStatistics =
        {
            'houseStats': houseStatistics,
            'citizenStats': citizenStats
        };
        return stats;
    }

    update(p: p5): void {
        this.citizens.forEach(citizen => citizen.update(p));
    }

    draw(p: p5): void {
        this.citizens.forEach(citizen => citizen.draw(p));

        this.houses.forEach(house => house.draw(p));
    }
}
