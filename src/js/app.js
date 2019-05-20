//import
import $ from "jquery";
//import style
import '../css/main.scss'

//import js file
import {test} from './model/test.js'

test();
TweenMax.to($('.container'), 1, { backgroundColor: "red" });