
// voltages = [50, 60, 70, 80, 90, 100, 110, 120, 130];
// omegas = [0.1, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19];
// phases = [0, 0, 0, 0, 0, 0, 0, 0, 0];


// TRIFASE -------------------------------

voltages = [100, 100, 100];
omegas = [0.1, 0.1, 0.1];
phases = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];

let origin_x = 400;
let origin_y = 400;

function setup() {
  createCanvas(800, 800);
  frameRate(60);
}

function draw() {
  background(255);
  stroke(0);
  strokeWeight(1);

  line(0, 400, 800, 400);
  line(400, 0, 400, 800);

  tmp_x = origin_x;
  tmp_y = origin_y;

  for (i = 0; i < voltages.length; ++i) {
    strokeWeight(2);
    line(tmp_x, tmp_y, (tmp_x + voltages[i] * cos(omegas[i] * frameCount + phases[i])), (tmp_y + voltages[i] * sin(omegas[i] * frameCount + phases[i])));
    tmp_x = tmp_x + voltages[i] * cos(omegas[i] * frameCount + phases[i]);
    tmp_y = tmp_y + voltages[i] * sin(omegas[i] * frameCount + phases[i]);
  }

  tot_V = sqrt(pow(origin_x - tmp_x, 2) + pow(origin_x - tmp_x, 2));

  stroke(204, 102, 0);
  strokeWeight(4);
  line(origin_x, origin_y, origin_x + tot_V * (tmp_x - origin_x) / tot_V, origin_y);

  stroke(0, 102, 204);
  strokeWeight(4);
  line(origin_x, origin_y, origin_x, origin_y + tot_V * (tmp_y - origin_y) / tot_V);
}
