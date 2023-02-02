let wires = [];
let nWires = 2;

let vecLenght = 15;
let nForces = 30;
let force = [nForces][nForces];

function setup() {
  createCanvas(800, 800);

  for (let index = 0; index < nWires; index++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    //let omega = random(0.01, 0.005);
    //let phase = random(-Math.PI, Math.PI);

    let omega = 0.01;
    let phase = 0;

    let i = r * 5;
    wires[index] = new Wire(x, y, r, i, omega, phase);
  }

}

function draw() {

  background(51);

  wires.forEach(wire => {
    wire.i = wire.i_max * cos(wire.omega * frameCount + wire.phase);
  });

  colorMode(HSB);
  for (let i = 0; i < nForces; i++) {
    for (let j = 0; j < nForces; j++) {
      var posX = width / nForces * i;
      var posY = height / nForces * j;
      var vector = getForce(posX, posY);

      intensity = sqrt(pow(vector.x, 2) + pow(vector.y, 2));
      normVector = normalise(vector.x, vector.y);

      stroke(map(intensity, 0, 0.5, 0, 360), 255, 255);
      strokeWeight(2);
      line(posX, posY, posX + normVector.x * vecLenght, posY + normVector.y * vecLenght);
    }
  }

  colorMode(RGB)
  for (let index = 0; index < nWires; index++) {
    wires[index].show(mouseX, mouseY);
  }
}

function normalise(x, y) {
  intensity = sqrt(pow(x, 2) + pow(y, 2));

  if (intensity != 0) {
    x = x / intensity;
    y = y / intensity;
  }

  return { x: x, y: y };
}

function getForce(posX, posY) {
  xVect = 0;
  yVect = 0;
  for (i = 0; i < nWires; i++) {
    distance = sqrt(pow(wires[i].x - posX, 2) + pow(wires[i].y - posY, 2));
    xVect += 1 / pow(distance, 2) * (wires[i].i * (posY - wires[i].y));
    yVect += 1 / pow(distance, 2) * (wires[i].i * (wires[i].x - posX));
  }

  return { x: xVect, y: yVect };
}

function mousePressed() {
  for (let index = 0; index < nWires; index++) {
    wires[index].pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let index = 0; index < nWires; index++) {
    wires[index].notPressed();
  }
}


class Wire {
  constructor(x, y, r, i_max, omega, phase) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.phase = phase;
    this.i_max = i_max;
    this.i = 0;
    this.omega = omega;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.rollover = false;
  }

  show(px, py) {
    if (this.dragging) {
      this.x = px + this.offsetX;
      this.y = py + this.offsetY;
    }

    stroke(255);
    strokeWeight(3);

    if (this.i > 0) {
      fill(map(this.i, 0, this.i_max, 0, 255), 0, 0);
      ellipse(this.x, this.y, this.r * 2);
      strokeWeight(10);
      point(this.x, this.y);
    } else {
      fill(0, 0, -map(this.i, -this.i_max, 0, -255, 0));
      ellipse(this.x, this.y, this.r * 2);
      strokeWeight(6);
      line(this.x + (this.r / 2), this.y + (this.r / 2), this.x - (this.r / 2), this.y - (this.r / 2));
      line(this.x + (this.r / 2), this.y - (this.r / 2), this.x - (this.r / 2), this.y + (this.r / 2));
    }

  }

  pressed(px, py) {
    if ((px - this.x) * (px - this.x) + (py - this.y) * (py - this.y) < (this.r * this.r)) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}