import $ from 'jquery';

// Toggle play and pause icons of player based on state
export const updatePlayerIcon = (playing, playIcon, pauseIcon) => {
    if(playing) {
      $(pauseIcon).css('opacity', '1');
      $(playIcon).css('opacity', '0');
    } else {
      $(pauseIcon).css('opacity', '0');
      $(playIcon).css('opacity', '1');
    }
}

// Toggle play and pause icons of selected button based on state
export const updateBtnIcon = (playing, btnId) => {
  if(playing) {
    $(`#${btnId} g`).css('opacity', '1');
    $(`#${btnId} polygon`).css('opacity', '0');
  } else {
    $(`#${btnId} g`).css('opacity', '0');
    $(`#${btnId} polygon`).css('opacity', '1');
  }
}