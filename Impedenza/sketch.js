
let vec = { r: 100, i: 20 };
let z = { r: 20, i: 100 };

let origin = { x: 200, y: 200 };

function setup() {
  createCanvas(600, 400);

  reZ_btn = createInput();
  reZ_btn.position(420, 50);
  imZ_btn = createInput();
  imZ_btn.position(420, 80);
  reV_btn = createInput();
  reV_btn.position(420, 150);
  imV_btn = createInput();
  imV_btn.position(420, 180);

}

function draw() {
  background(250);

  stroke(0);
  strokeWeight(1);
  line(200, 0, 200, 400);
  line(0, 200, 400, 200);

  strokeWeight(3)
  stroke(255, 0, 0);
  line(origin.x, origin.y, origin.x + vec.r, origin.y + vec.i);

  stroke(0, 0, 255);
  line(origin.x, origin.y, origin.x + z.r, origin.y + z.i);

}
