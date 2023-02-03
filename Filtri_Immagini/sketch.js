
//Standard
let f_matrix = [[0, 0, 0], [0, 0.1, 0], [0, 0, 0]];

// Sharpen
let f_matrix_2 = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];

// Edge detect
let f_matrix_3 = [[0, 1, 0], [1, -4, 1], [0, 1, 0]];

// Emboss
let f_matrix_4 = [[-2, -1, 0], [-1, 1, 1], [0, 1, 2]];

let img;

function setup() {
  var canvas = createCanvas(600, 596);
  canvas.parent('canvasP5');
  loadImg("mongolfiere.jpg");
}

function filterMatrix(img, matrix) {

  let tmpImage = [];

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      tmpImage[x + y * width] = convolution(x, y, matrix, 3, img);
    }
  }

  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * width) * 4;
      let index_2 = (x + y * width);
      img.pixels[index] = red(tmpImage[index_2]);
      img.pixels[index + 1] = green(tmpImage[index_2]);
      img.pixels[index + 2] = blue(tmpImage[index_2]);

    }
  }

  img.updatePixels();
}


function onPressedApply() {
  filterMatrix(img, f_matrix_2);
  image(img, 0, 0);
}

function loadImg(fileName) {
  img = loadImage(`assets/${fileName}`, img => {
    img.loadPixels();
    image(img, 0, 0);
  });
}


function convolution(x, y, matrix, matrixsize, img) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {

      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + img.width * yloc) * 4;

      //Verifica di non essere uscito dall'immagine
      loc = constrain(loc, 0, img.pixels.length - 1);

      //Ottieni valori rgb
      rtotal += (img.pixels[loc]) * matrix[i][j];
      gtotal += (img.pixels[loc + 1]) * matrix[i][j];
      btotal += (img.pixels[loc + 2]) * matrix[i][j];
    }
  }

  //Verifica validità valori rgb
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);

  return color(rtotal, gtotal, btotal);
}
