
let points = []

let nPoints = 5000;
let angleMax = 100 * Math.PI;

var equations = {
  x: (theta) => theta * sin(theta),
  y: (theta) => theta * cos(theta),
  z: (theta) => 50 * log(theta),
}

function setup() {
  createCanvas(600, 600, WEBGL);

  for (let index = 0; index < nPoints; index++) {
    angle = angleMax / nPoints * index;
    x = equations.x(angle);
    y = equations.y(angle);
    z = equations.z(angle);
    points[index] = { x, y, z };
  }

}

function draw() {

  background(220);

  noFill();
  stroke(0);

  beginShape();
  rotateY(frameCount * 0.01);
  rotateX(frameCount * 0.02);

  points.forEach(element => {
    vertex(element.x, element.y, element.z);
  });
  endShape();

}
