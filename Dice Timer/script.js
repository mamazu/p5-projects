let diceRoller, timer;

function setup() {
  createCanvas(800, 800);
  
  reset();

  // Registering listeners on multiplier
  select('#multiplier').input(e => diceRoller.setMultiplier(e.target.value));

  // Adding a roll
  select('#roll').mousePressed(() => {
    let sides = select('#sidesOfDice').value();
    diceRoller.roll(sides);
  });

  select('#timer').mousePressed(() => {
    if (!diceRoller.hasRolled()) {
      return;
    }
    timer = new CountdownTimer(diceRoller.getMultipliedValues());
    frameRate(1);
  });

  select('#reset').mousePressed(reset)

  textAlign(CENTER, CENTER);
}

function draw() {
  if (timer === undefined) {
    background(255);
    textSize(50);
    fill(255, 0, 0);
    if (!diceRoller.hasRolled()) {
      printText('Please click the roll button');
    } else {
      printText(`You rolled a ${diceRoller.getRolledValue()}\n which makes ${diceRoller.getMultipliedValues()}`);
    }
  } else {
    background(21);
    fill(255);
    textStyle();
    textSize(100);
    printText(timer.getTime());
    timer.tick();
  }

}

function reset() {
  diceRoller = new DiceRoller(select('#multiplier').value());

  timer = undefined;
  frameRate(60);
}

// Helper function
function printText(textString) {
  text(textString, width / 2, height / 2);
}