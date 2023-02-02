
let matrix;
let matrixDimension = 3;
var inputs;

function setup() {
  createCanvas(1000, 800);
  for (let i = 0; i < matrixDimension; i++) {
    for (let j = 0; j < matrixDimension; j++) {
      inputs[i + j] = createButton();
      inputs[i + j].position(i * 20, j * 20);
    }
  }


}

function draw() {
  background(220);

  line(800, 0, 800, 1000);

}
