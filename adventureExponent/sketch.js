class Producer{
  constructor(timeout, amount, name){
    this.timeout = timeout;
    this.tickAmount = 0;
    this.amount = amount;
    this.productAmount = 1;
    this.name = name;
  }

  tick(currentTick){
    this.tickAmount = currentTick % this.timeout;
    if(this.tickAmount === 0){
      return this.productAmount * this.amount;
    }
    return 0;
  }
  draw(x, y, elementWidth, elementHeight){
    if(this.amount !== 0){
      // Drawing progressbox
      fill('yellow');
      let progress = this.tickAmount / this.timeout;
      rect(x,y-elementHeight, elementWidth*progress, elementHeight);
    }
    // drawing names
    fill(0)
    text(this.name+": "+this.amount+"("+this.productAmount+")", x, y);
  }
}

class Department{
  constructor(resource){
    this.resource = resource;
    this.producer = [
      new Producer(50, 0, "Worker"),
      new Producer(100, 0, "Community"),
      new Producer(200, 0, "City"),
      new Producer(300, 1, "Country"),
    ]
    this.currentTime = 0;
  }

  tick(){
    this.currentTime++;
    let amount = 0;
    this.producer.forEach((producer, index) => {
      if(index === 0){
        amount = producer.tick(this.currentTime);
      }else{
        let lastProducer = this.producer[index-1];
        lastProducer.amount += producer.tick(this.currentTime);
      }
    })

    let result = {};
    result[this.resource] = amount;
    return result;
  }

  draw(index, offset){
    let thisHeight = 50;
    let y = index * thisHeight + offset;
    let fontSize = 20
    // drawing the background
    fill('green');
    rect(0, y,width, y+thisHeight)
    // drawing the name
    textSize(fontSize);
    y += fontSize;
    fill(0);
    text(this.resource, 0, y);
    textSize(fontSize-2);
    // drawing the workers
    let elementWidth = width/2;
    this.producer.forEach((producer, index) => {
      let x = elementWidth * (index % 2);
      y += fontSize * ((index+1) % 2);
      producer.draw(x,y, elementWidth, fontSize);
    });
  }
}

class Buisness{
  constructor(name){
    this.name = name;
    this.resources = {}
    this.departments = [new Department('Potatos')];
  }

  tick(){
    let produced = {};
    this.departments.forEach(department => {
      produced = department.tick();
    });
    // Updating the buisnesses resource
    if(produced !== undefined){
      this.addResources(produced);
    }
  }

  addResources(newResources){
    for(let resource in newResources){
      if(this.resources[resource] !== undefined){
        this.resources[resource] += newResources[resource];
      }else{
        this.resources[resource] = newResources[resource];
      }
    }
  }

  draw(){
    // Drawing the background
    let size = 30;
    fill(125);
    rect(0, 0, width, size+5);
    // Drawing the name
    fill(0);
    textSize(size);
    text(this.name, 10, size);
    this.drawResources(50);
    // Drawing the other buisnesses
    this.departments.forEach((department,i) => department.draw(i, 60));
  }

  drawResources(yOffset){
    textSize(12);
    let index = 0;
    let xOffset = width/Object.keys(this.resources).length;
    for(let resource in this.resources) {
      let value = this.resources[resource];
      text(resource + ": " + value, index * xOffset, yOffset);
      index++;
    }
  }
}

let buisness = new Buisness('Some big buisness');

function setup(){
  createCanvas(800, 800);
}

function draw(){
  background(255);
  buisness.tick();
  buisness.draw();
}

function mouseClicked(){
  if (mouseY < 35 ){
    buisness.name = prompt('Enter a new buisness name');
  }
}
