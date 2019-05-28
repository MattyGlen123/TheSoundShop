import $ from "jquery";
import '../css/main.scss'


//import modal js files
import ModalPath from './model/modal-draw-path';


// init modal class with elements
const modalPath = new ModalPath(elements.svg, elements.player);


// import view js files
import { updatePlayerIcon, updateBtnIcon } from './view/view-play-pause';
import { playPlayer, pausePlayer } from './view/view-player';
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

const state = { 
  playing: false
};


elements.btnBox.on('click', (e) => {
  e.preventDefault();

  // Run if 
    // 1. Click event is on button
    // 2. Click event is on a diferent button
  if($(e.target).hasClass("btn") && !$(e.target).hasClass("active")) {

    // reset UI
    $(elements.btnList).each(function() {
      $(this).removeClass("active");
    });
    
    // Uses previous clicked button to reset UI
    if(state.playing) {
      $(`#${state.clickedBtn.id} g`).css('opacity', '0');
      $(`#${state.clickedBtn.id} polygon`).css('opacity', '1');
    }

    // Store active button in state
    state.clickedBtn = e.target;

    $(state.clickedBtn).addClass("active");

    // calculates the start and end points for the path
    state.coordinates = modalPath.collectCoordinates( $(`#${state.clickedBtn.id}`));

    // calculate the distance of the path
    state.lengths = modalPath.calcDelta();


    // test if the clicked button has wrapped to a different line
    if ($("#btn-1").offset().top === $(`#${state.clickedBtn.id}`).offset().top) {

      // Update UI
      renderPath(elements.path, state.coordinates, state.lengths);

    } else {

      // If button has wrapped, the path calculates a different route
      renderPathWrapped(elements.path, state.coordinates, state.lengths, elements.svg.offset().top);

    }

    // save length of the path to state
    state.pathTotalLength = document.querySelector('.line').getTotalLength(); 

    // set length of path
    setPathLength(elements.path, state.pathTotalLength);


    // Control music bar animation
    if(state.playing) { // first time button is clicked start
      
      // Cancel last animation
      pausePlayer(state.interval);

      // Start animation, store interval in state
      state.interval = playPlayer(elements.musicBarList);

    } else { // button has been clicked but state is playing

      // Start animation, store interval in state
      state.interval = playPlayer(elements.musicBarList);

      // Update state
      state.playing = !state.playing;

    }

    // Update UI
    updatePlayerIcon(state.playing, elements.playerPlay, elements.playerPause);
    updateBtnIcon(state.playing, state.clickedBtn.id);
    

    // call Tween Max
    animatePath(elements.path);

    return
  }
  

  if ( $(e.target).hasClass("btn") && $(e.target).hasClass("active") ) { 
    // Click is on the active button
    
    // Control music bar animation
    if(state.playing) {

      // Cancel last animation
      pausePlayer(state.interval);

      // Update state
      state.playing = !state.playing;

    } else {

      // Start animation, store interval in state
      state.interval = playPlayer(elements.musicBarList);

      // Update state
      state.playing = !state.playing;

    }
  }

    // Update UI
    updatePlayerIcon(state.playing, elements.playerPlay, elements.playerPause);
    updateBtnIcon(state.playing, state.clickedBtn.id);

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