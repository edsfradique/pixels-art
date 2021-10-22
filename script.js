const boardPixel = document.getElementById("board");
const pixelBoard = document.getElementById("pixel-board");
const pixel = document.getElementsByClassName("colors");

function randomColor() {
  return `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${
    Math.random() * 256
  })`;
}

function paletColor() {
  const arr = [
    "black",
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
    "white",
  ];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[0] === "black") {
      pixel[0].style.backgroundColor = "black";
      pixel[0].className = "colors selected";
    }
    pixel[i].style.backgroundColor = arr[i];
  }
}

function colorSelect(is) {
  for (let i in pixel) {
    document.getElementsByClassName("colors")[i].className = "colors";
    const select = is.target;
    select.className = "colors selected";
  }
}

function selectColor() {
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].addEventListener("click", colorSelect);
  }
}

function createBoard() {
  for (let i = 1; i <= 55.14 ** 2; i += 1) {
    const createPixel = document.createElement("div");
    boardPixel.appendChild(createPixel);
    createPixel.className = "pixel";
  }
}

function colorPixel(is) {
  const printColor = document.querySelector(".selected").style.backgroundColor;
  const divIs = is;
  if (divIs.target.className === "pixel") {
    divIs.target.style.backgroundColor = printColor;
  }
}

function pixelColor() {
  const divPixel = document.getElementsByClassName("pixel");
  for (let i = 0; i < divPixel.length; i += 1) {
    divPixel[i].addEventListener("mouseenter", colorPixel);
  }
}

window.onload = function init() {
  createBoard();
  paletColor();
  selectColor();
  pixelColor();
};
