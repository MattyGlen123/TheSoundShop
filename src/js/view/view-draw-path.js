// set up event listeners

export const renderPath = (path, coordinates, length) => {
  // draw path
    // 1. start point
    // 2. move a bit down,
    // 3. move a bit to the right
    // 4. move down to the end
  path.attr(
    "d",
    `M ${coordinates.startX} ${coordinates.startY}
                 V ${coordinates.startY + length.delta}
                 H ${coordinates.endX - length.delta * signum(length.deltaX)} 
                 V ${coordinates.endY + 20}`
  );
}


export const renderPathWrapped = (path, coordinates, length, svgLeft) => {
  // draw path to wrapped button
    // 1. start point
    // 2. move down,
    // 3. move to the left
    // 4. move down
    // 5. move right
    // 4. move down to the end
    path.attr(
      "d",
      `M ${coordinates.startX} ${coordinates.startY}
                   V ${coordinates.startY + 20}
                   H ${svgLeft + 10}
                   V ${coordinates.endY - 20}
                   H ${coordinates.endX - length.delta * signum(length.deltaX)}
                   V ${coordinates.endY + 20}`
    );
}


export const setPathLength = (path, pathLength) => {
    // set path styles to dynamic length
    path.css("stroke-dasharray", pathLength);
    path.css("stroke-dashoffset", pathLength);
}

export const resetPathLength = (path) => {
  // reset path length
  path.css("stroke-dasharray", "0");
}


export const animatePath = (path) => {
  // animate path
  TweenMax.to(path, .6, {
    strokeDashoffset: 0,
    ease: Power4.easeOut
  });
}



function signum(x) {
  // calc the center of the end element
  return x < 0 ? -1 : 1;
} 