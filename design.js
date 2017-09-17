/*
* TODO:
  1. add a convinience side panel for mobile users to:
    1.1 retrieve colour in pixel by pressing it
    1.2 clear the grib keeping the same N x M values use to make the grid
    1.3 colour palette for non standards browsers
*/

// set brush colour to default, black
let brushColor = '#000000';

/**
* @description Set event listeners and default values
*/
function initPixelArt() {
  // on form submit call makeGrid function and prevent default action
  let submitButton = $('form');
  submitButton.on('submit', false);
  submitButton.on('submit',makeGrid);

  // set event listenet on the colour picker and update the brush colour to its most current value
  let colorPicker = $('.color-picker');
  colorPicker.on('change', function(){ brushColor = $(this).prop('value'); });

  // Some browsers keep previous value. Reset them on page reload.
  $('.grid-width').prop('value', '1');
  $('.grid-height').prop('value', '1'); 
  colorPicker.prop('value', "#000000");
}


/**
* @description Takes the user input and creates a grid for drawing
*/
function makeGrid() {
  // grab input values height and width from form
  const GRID_HEIGHT = $('.grid-height').prop('value');
  const GRID_WIDTH = $('.grid-width').prop('value');
  // gridTable
  let gridTable = $('.design-canvas');

  // if gridTable has any children divorse them and create new family
  if (gridTable.children().length !== 0){
    gridTable.children().remove();
  }

  // draw canvas grid use input values
  let n = 1;
  while( n <= GRID_HEIGHT ){
  	gridTable.append('<tr class="grid-row"></tr>');
    n++;
  }
  for (let m=1; m <= GRID_WIDTH; m++){
    gridTable.children().append('<td class="grid-col"></td>');
  }

  // set event listeners on each pixel
  $('td').on('click', paintPixel);
}

/**
* @description Use brush colour to paint pixel
*/
function paintPixel(){
  $(this).css('background-color', brushColor);
}

// wait for page load
$(initPixelArt);