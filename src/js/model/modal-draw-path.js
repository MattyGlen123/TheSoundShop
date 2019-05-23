import $ from 'jquery';
import { elements } from '../base';


export default class ModalPath {
    constructor(svg, startElement) {
        this.svg = svg;
        this.startElement = startElement;
        this.coordinates = {};
        this.length = {};
    }

    collectCoordinates(endElement) {

        // get (top, left) corner coordinates of the svg container   
        const svgTop  = this.svg.offset().top;
        const svgLeft = this.svg.offset().left;

        // get (top, left) coordinates for the two elements
        const startCoord = this.startElement.offset();
        const endCoord = endElement.offset();


        // calculate path's start (x,y)  coords
        // we want the x coordinate to visually result in the element's mid point
        this.coordinates.startX = startCoord.left + 0.5 * this.startElement.outerWidth() - svgLeft; 
        this.coordinates.startY = startCoord.top  + this.startElement.outerHeight() - svgTop;


        // calculate path's end (x,y) coords
        this.coordinates.endX = endCoord.left + 0.5 * endElement.outerWidth() - svgLeft;
        this.coordinates.endY = endCoord.top  - svgTop;

        // method to export startX startY endX endY
        return this.coordinates;
    }

    calcDelta() {

        // delta is used to calculate the length the path
        this.length.deltaX = (this.coordinates.endX - this.coordinates.startX) * 0.15;
        this.length.deltaY = (this.coordinates.endY - this.coordinates.startY) * 0.15; 


        // for further calculations which ever is the shortest distance
        this.length.delta = this.length.deltaY < this.absolute(this.length.deltaX) ? this.length.deltaY : this.absolute(this.length.deltaX);

        return this.length;
    }

    absolute(x) { 
        // turn negative numbers to 0
        return x < 0 ? -x : x;
    }
}
