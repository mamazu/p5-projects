let sketch = (p: p5) => {
    let container: p5.Element;
    let industries: Industry[] = [];

    p.setup = () => {
        p.noCanvas();
        p.frameRate(20);

        let c = p.select('#container');
        if (c instanceof p5.Element) {
            container = c;
        } else {
            p.noLoop();
            console.error('Could not find element');
        }

        let potatoIndustry = new Industry('potato');
        potatoIndustry.addProducer('Farmer');
        potatoIndustry.addProducer('Farmer Store');
        potatoIndustry.addProducer('Agrary Council');
        industries.push(potatoIndustry);

    };

    p.draw = () => {
        // Update
        industries.forEach(industry => industry.tick(1))

        // Draw
        let sourceCode = industries.map((industry) => industry.show())
            .map(s => `<div>${s}</div>`).join('');
        container.html(sourceCode);
    }
};

let sketchP = new p5(sketch);
