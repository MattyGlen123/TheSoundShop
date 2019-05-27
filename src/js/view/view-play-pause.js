import $ from 'jquery';

export const updatePlayerIcon = (playing, playIcon, pauseIcon) => {
    if(playing) {
      $(pauseIcon).css('opacity', '1');
      $(playIcon).css('opacity', '0');
    } else {
      $(pauseIcon).css('opacity', '0');
      $(playIcon).css('opacity', '1');
    }
}

export const updateBtnIcon = (playing, btnId) => {
  if(playing) {
    $(`#${btnId} g`).css('opacity', '1');
    $(`#${btnId} polygon`).css('opacity', '0');
  } else {
    $(`#${btnId} g`).css('opacity', '0');
    $(`#${btnId} polygon`).css('opacity', '1');
  }
}