import $ from "jquery";
import '../css/main.scss'


//import modal js files
import ModalPath from './model/modal-draw-path';

// init modal class with elements
const modalPath = new ModalPath(elements.svg, elements.player);

// import view js files
import {  renderPath,
          renderPathWrapped,
          setPathLength, 
          animatePath, 
          resetPathLength } 
          from './view/view-draw-path'


// base file contains DOM elements
import { elements } from './base';


/***************** Controller *****************/
// 1. set up event listeners
// 2. control method calls
// 3. update global state

const state = { };


elements.btnBox.on('click', (e) => {

  // Run if 
    // 1. Click event is on button
    // 2. Click event is on a diferent button
  if(e.target.className === "btn" && e.target.className !== "active") {

    // store active button in state
    state.clickedBtn = e.target;
    

    // calculates the start and end points for the path
    state.coordinates = modalPath.collectCoordinates( $(`#${state.clickedBtn.id}`));


    // calculate the distance of the path
    state.lengths = modalPath.calcDelta();


    // test if the clicked button has wrapped to a different line
    if ($("#btn-1").offset().top === $(`#${state.clickedBtn.id}`).offset().top) {

      // Update UI
      renderPath(elements.path, state.coordinates, state.lengths);

    } else {

      // If button has wrapped the path calculates a different route
      renderPathWrapped(elements.path, state.coordinates, state.lengths, elements.svg.offset().top);

    }

    // save length of the path to state
    state.pathTotalLength = document.querySelector('.line').getTotalLength(); 


    // set length of path
    setPathLength(elements.path, state.pathTotalLength);


    // call Tween Max
    animatePath(elements.path);

    console.log(state);
  }


});

$(window).resize(function() {
  resetPathLength(elements.path);

  // calculates the start and end points for the path
  state.coordinates = modalPath.collectCoordinates( $(`#${state.clickedBtn.id}`));


  // calculate the distance of the path
  state.lengths = modalPath.calcDelta();


  // test if the clicked button has wrapped to a different line
  if ($("#btn-1").offset().top === $(`#${state.clickedBtn.id}`).offset().top) {

    // Update UI
    renderPath(elements.path, state.coordinates, state.lengths);

  } else {

    // If button has wrapped the path calculates a different route
    renderPathWrapped(elements.path, state.coordinates, state.lengths, elements.svg.offset().top);

  }
});