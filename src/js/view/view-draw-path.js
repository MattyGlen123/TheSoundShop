export const renderPath = (path, coordinates, length) => {
  // draw path
    // 1. M = start point
    // 2. V = move a bit down,
    // 3. H = move a bit to the right
    // 4. V = move down to the end
  path.attr(
    "d",
    `M ${coordinates.startX} ${coordinates.startY}
        V ${coordinates.startY + length.delta + 20}
        H ${coordinates.endX - length.delta * signum(length.deltaX)} 
        V ${coordinates.endY + 20}`
  );
}


export const renderPathWrapped = (path, coordinates, length, svgLeft) => {
  // draw path to wrapped button
    // 1. M = start point
    // 2. V = move down,
    // 3. H = move to the left
    // 4. V = move down
    // 5. H = move right
    // 4. V = move down to the end
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
    // Set path styles to dynamic length
    path.css("stroke-dasharray", pathLength);
    path.css("stroke-dashoffset", pathLength);
}

export const resetPathLength = (path) => {
  // Reset path length
  path.css("stroke-dasharray", "0");
}


export const animatePath = (path) => {
  // Animate path
  TweenMax.to(path, .6, {
    strokeDashoffset: 0,
    ease: Power4.easeOut
  });
}



function signum(x) {
  // Calculates the center of the end element
  return x < 0 ? -1 : 1;
} 