/*
* TODO:
  1. add a convinience side panel for mobile user.
    1.1 to hide all the tools available. stops users from having to do much scrolling.
  2. retrieve colour in pixel by pressing it. Stops from having to use the colour wheel when
  the user wishes to use a colour they have already used.
  4. Colour palette for non standards browsers. Will need to research this one a bit.
  6. Grid should have limit depending on screen size??
*/

// set brush colour to default, black
let brushColor = '#000000';

// if eraser is off teh paint brush in active
let eraserOn = false;

/**
* @description Set event listeners and default values
*/
function initPixelArt() {
  // on form submit call makeGrid function and prevent default action
  let submitButton = $('form');
  submitButton.on('submit', false);
  submitButton.on('submit', makeGrid);

  // set event listener on clear button
  $('.clear-canvas').on('click', clearGrid);

  // set listerner for eraser
  let eraser = $('#eraser');
  eraser.on('change', erasePixel);

  // set event listener on the colour picker and update the brush colour to its most current value
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
  $('td').on('click', toolsPallete);
}

/**
* Tools pallete looks after the paint brush, eraser and clear
*/
function toolsPallete() {
  color = (eraserOn)?'#ffffff':brushColor;
  paintPixel($(this), color);
}

/**
* @description Clears the colours in the grid
*/
function clearGrid() {
  makeGrid();
}

/**
* @description Use brush colour to paint pixel
*/
function paintPixel(pixel, color){
  pixel.css('background-color', color);
}

/**
* @description Erase pixel colours setting it back to white
*/
function erasePixel() {
  eraserOn = (eraserOn)?false:true;
}

// wait for page load
$(initPixelArt);