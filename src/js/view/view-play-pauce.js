import $ from 'jquery';

export const renderIcon = (playing, playIcon, pauceIcon) => {
    if(playing) {
      $(pauceIcon).css('opacity', '1');
      $(playIcon).css('opacity', '0');
    } else {
      $(pauceIcon).css('opacity', '0');
      $(playIcon).css('opacity', '1');
    }
}