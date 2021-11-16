const choiceColors = document.querySelectorAll('.choice-color');
const pixelsContainer = document.querySelector('#pixels-container');
const pixels = document.querySelectorAll('.pixels');
const inputLines = document.querySelector('#input-lines');
const inputColumns = document.querySelector('#input-columns');
const btnOK = document.querySelector('#btn-ok');
const btnR = document.querySelector('#choice-roll');
const btnOff = document.querySelector('#btn-off');
const inputColor = document.querySelector('#input-color');
const btnBorder = document.querySelector('#btn-border');
const btnPrint = document.querySelector('#btn-print');

// Gera a cor aleatória
const getNumberRandom = () => Math.trunc(Math.random() * 255) + 1;
const getRandomColor = () =>
  `rgb(${getNumberRandom()}, ${getNumberRandom()}, ${getNumberRandom()})`;

// Constroi o container de cores
const createColorContainer = () => {
  for (let i = 1; i < choiceColors.length - 2; i += 1) {
    choiceColors[i].style.backgroundColor = getRandomColor();
    choiceColors[0].style.backgroundColor = inputColor.value;
    choiceColors[0].classList.add('select');
    choiceColors[choiceColors.length - 2].style.backgroundColor =
      'rgb(20, 20, 20)';
    choiceColors[choiceColors.length - 2].classList.add('select');
  }
};

// Seleciona a cor
const clearSelectClass = (params) => {
  for (let i = 0; i < choiceColors.length; i += 1) {
    if (choiceColors[i] === choiceColors[params]) {
      choiceColors[i].classList.add('select');
    } else {
      choiceColors[i].classList.remove('select');
    }
  }
};

const selectColor = () => {
  for (let i = 0; i < choiceColors.length; i += 1) {
    choiceColors[i].addEventListener('click', () => {
      clearSelectClass(i);
    });
  }
};

// Constroi o quadro de pixels
const createPixelsBoardLine = (params) => {
  const amountPixels = params;
  for (let i = 1; i <= amountPixels; i += 1) {
    const createDivLine = document.createElement('div');
    pixelsContainer.appendChild(createDivLine);
    createDivLine.classList.add('lines');
  }
};

const createPixelsBoardColumn = (params) => {
  const amountPixels = params;
  const createDivLine = document.querySelectorAll('.lines');
  for (let k = 1; k <= amountPixels; k += 1) {
    for (let i = 0; i < createDivLine.length; i += 1) {
      const createDivColumn = document.createElement('div');
      createDivLine[i].appendChild(createDivColumn);
      createDivColumn.classList.add('pixel');
    }
  }
};

// Pinta o quadro de pixels
const paintPixelsBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].addEventListener('click', (event) => {
      const select = document.querySelector('.select');
      event.target.style.backgroundColor = select.style.backgroundColor;
    });
  }
};

// Adiciona funções aos inputs e buttons
const btnBorderChange = () => {
  const pixels = document.querySelectorAll('.pixel');
  btnBorder.addEventListener('click', () => {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].classList.toggle('pixel');
      pixels[i].classList.toggle('no-border');
    }
  });
};

const clearBoard = () => {
  pixelsContainer.innerHTML = '';
};

const chanceBoardSize = () => {
  btnOK.addEventListener('click', () => {
    if (
      inputLines.value > 100 ||
      inputLines.value < 1 ||
      inputColumns.value > 100 ||
      inputColumns.value < 1
    ) {
      window.alert(`
LINES - MIN VALUE : 1 - MAX VALUE : 100
COLUMNS - MIN VALUE : 1 - MAX VALUE : 100`);
    } else {
      clearBoard();
      createColorContainer();
      createPixelsBoardLine(inputLines.value);
      createPixelsBoardColumn(inputColumns.value);
      selectColor();
      paintPixelsBoard();
      btnBorderChange();
    }
  });
};

const rollColors = () => {
  btnR.addEventListener('click', () => {
    createColorContainer();
  });
};

const inputColorChange = () => {
  inputColor.addEventListener('input', () => {
    choiceColors[0].style.backgroundColor = inputColor.value;
  });
};

const btnOffChange = () => {
  const h1 = document.querySelector('h1');
  btnOff.addEventListener('click', () => {
    h1.classList.toggle('hidden');
    if (btnOff.textContent === 'OFF') {
      btnOff.textContent = 'ON';
      btnOff.classList.add('btn-success');
      btnOff.classList.remove('btn-danger');
    } else {
      btnOff.textContent = 'OFF';
      btnOff.classList.remove('btn-success');
      btnOff.classList.add('btn-danger');
    }
  });
};

$('#btn-print').click(() => {
  html2canvas(pixelsContainer).then((canvas) => {
    saveAs(canvas.toDataURL(), 'download.png');
  });
  function saveAs(uri, filename) {
    const link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }
});

// window.onload
window.onload = () => {
  createColorContainer();
  createPixelsBoardLine(72);
  createPixelsBoardColumn(36);
  selectColor();
  paintPixelsBoard();
  chanceBoardSize();
  rollColors();
  inputColorChange();
  btnOffChange();
  btnBorderChange();
};
