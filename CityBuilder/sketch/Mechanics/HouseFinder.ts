type houseFilterFunction = (house: House) => boolean;

class HouseFinder {
    public findClosestAvailableHouse(
        houses: House[],
        position: p5.Vector,
        filter: houseFilterFunction
    ): House | undefined {
        let bestHouse = undefined;
        let bestDistance = Infinity;
        for (let house of houses) {
            if (house.isFull() || !filter(house)) {
                continue;
            }

            let distance = p5.Vector.sub(position, house.getCenter()).magSq();
            if(distance < bestDistance) {
                bestDistance = distance;
                bestHouse = house;
            }
        }

        return bestHouse;
    }
}
