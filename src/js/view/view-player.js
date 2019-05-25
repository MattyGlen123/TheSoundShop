import $ from 'jquery';

export const playPlayer = (musicBarList) => {
  const interval = setInterval(function() {
    $(musicBarList).each(function() {
      TweenMax.to(this, 0.5, {
        height: Math.floor(Math.random() * 121) + 30,
        ease: Power0.easeNone,
      }, 0);
    });
  }, 200);
  // return interval to allow animation to be paused/cancelled
  return interval;
}

export const pausePlayer = (interval) => {
  // cancel setInterval
  clearInterval(interval);
}