let particles = [];
let nParticle = 1;

let vecLenght = 15;
let nForces = 30;
let force = [nForces][nForces];

function setup() {
  createCanvas(800, 800);

  for (let index = 0; index < nParticle; index++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    let c = random(-1, 1) > 0 ? r : r * -1;
    particles[index] = new Particle(x, y, r, c);
  }

}

function draw() {

  background(51);

  colorMode(HSB);
  for (let i = 0; i < nForces; i++) {
    for (let j = 0; j < nForces; j++) {
      var posX = width / nForces * i;
      var posY = height / nForces * j;
      var vector = getForce(posX, posY);

      intensity = sqrt(pow(vector.x, 2) + pow(vector.y, 2));
      normVector = normalise(vector.x, vector.y);

      stroke(map(intensity, 0, 0.001, 0, 360), 255, 255);
      strokeWeight(2);
      line(posX, posY, posX + normVector.x * vecLenght, posY + normVector.y * vecLenght);
    }
  }

  colorMode(RGB)
  for (let index = 0; index < nParticle; index++) {
    particles[index].show(mouseX, mouseY);
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
  for (i = 0; i < nParticle; i++) {
    distance = sqrt(pow(particles[i].x - posX, 2) + pow(particles[i].y - posY, 2));
    xVect += particles[i].c / pow(distance, 2) * (posX - particles[i].x) / distance;
    yVect += particles[i].c / pow(distance, 2) * (posY - particles[i].y) / distance;
  }

  return { x: xVect, y: yVect };
}

function mousePressed() {
  for (let index = 0; index < nParticle; index++) {
    particles[index].pressed(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let index = 0; index < nParticle; index++) {
    particles[index].notPressed();
  }
}


class Particle {
  constructor(x, y, r, c) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
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
    if (this.c > 0) {
      fill(255, 0, 0);
    } else {
      fill(0, 0, 255);
    }
    ellipse(this.x, this.y, this.r);
  }

  pressed(px, py) {
    if ((px - this.x) * (px - this.x) + (py - this.y) * (py - this.y) < this.r * this.r) {
      this.dragging = true;
      this.offsetX = this.x - px;
      this.offsetY = this.y - py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;
  }
}