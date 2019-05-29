import $ from "jquery";
import '../css/main.scss'


// Import modal js files
import ModalPath from './model/modal-draw-path';

// Init modal class with elements
const modalPath = new ModalPath(elements.svg, elements.player);


// Import view js files
import { updatePlayerIcon, updateBtnIcon } from './view/view-play-pause';
import { playPlayer, pausePlayer } from './view/view-player';
import {  renderPath,
          renderPathWrapped,
          setPathLength, 
          animatePath, 
          resetPathLength } 
          from './view/view-draw-path'


// Base file contains DOM elements
import { elements } from './base';


/***************** Controller *****************/
// 1. Set up event listeners
// 2. Control method calls
// 3. Update global state


const state = { 
  playing: false
};


elements.btnBox.on('click', (e) => {
  e.preventDefault();

  // Runs if 
    // 1. Click event is on button
    // 2. Click event is on a diferent button
  if($(e.target).hasClass("btn") && !$(e.target).hasClass("active")) {

    // Reset UI
    // Removes active class from previous button
    $(elements.btnList).each(function() {
      $(this).removeClass("active");
    });
    
    // Uses previous clicked button to reset play and pause Icons
    if(state.playing) {
      $(`#${state.clickedBtn.id} g`).css('opacity', '0');
      $(`#${state.clickedBtn.id} polygon`).css('opacity', '1');
    }

    // Store active button in state
    state.clickedBtn = e.target;

    
    $(state.clickedBtn).addClass("active");


    // Stores the start and end points for the path in state
    state.coordinates = modalPath.collectCoordinates( $(`#${state.clickedBtn.id}`));


    // Stores of the distance of the path in state
    state.lengths = modalPath.calcDelta();


    // Runs if
      //  Clicked button is at the same height as btn-1
    if ($("#btn-1").offset().top === $(`#${state.clickedBtn.id}`).offset().top) {

      // Render Path to UI
      renderPath(elements.path, state.coordinates, state.lengths);

    } else {
      
      // Button has wrapped, the path calculates a different route
      renderPathWrapped(elements.path, state.coordinates, state.lengths, elements.svg.offset().top);

    }

    // Save length of the path to state
    state.pathTotalLength = document.querySelector('.line').getTotalLength(); 


    // Sets length of path to allow line animation 
    setPathLength(elements.path, state.pathTotalLength);


    // Controls music bar animation
    if(state.playing) {
      
      // Passes state.interval to cancel previous animation
      pausePlayer(state.interval);

      // Start animation, store interval in state
      state.interval = playPlayer(elements.musicBarList);

    } else {

      // Starts animation, store interval in state
      state.interval = playPlayer(elements.musicBarList);

      // Update state
      state.playing = !state.playing;

    }

    // Update UI
    updatePlayerIcon(state.playing, elements.playerPlay, elements.playerPause);
    updateBtnIcon(state.playing, state.clickedBtn.id);
    

    // Creates drawn lines animation
    animatePath(elements.path);

    return
  }
  
  
  if ( $(e.target).hasClass("btn") && $(e.target).hasClass("active") ) { 
    
    
    // Control music bar animation
    if(state.playing) {

      // Passes state.interval to cancel previous animation
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
  // Checks a button is clicked
  if(state.clickedBtn === undefined) return;


  resetPathLength(elements.path);

  
  // Calculates the start and end points for the path
  state.coordinates = modalPath.collectCoordinates( $(`#${state.clickedBtn.id}`));


  // Calculate the distance of the path
  state.lengths = modalPath.calcDelta();


  // Test if the clicked button has wrapped to a different line
  if ($("#btn-1").offset().top === $(`#${state.clickedBtn.id}`).offset().top) {

    // Update UI
    renderPath(elements.path, state.coordinates, state.lengths);

  } else {

    // If button has wrapped the path calculates a different route
    renderPathWrapped(elements.path, state.coordinates, state.lengths, elements.svg.offset().top);

  }
});