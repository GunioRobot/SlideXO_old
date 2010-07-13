/*!
 * SlideXO - Presentation Framework
 *
 * Copyright (c) 2010 Jason Daihl (http://slidexo.com)
 * Licensed under the TBD license.
 */

 var SlideXO = (function() {
	
	alert("SlideXO");
	
 })();
 
/*
var ROOT = document.documentElement;
var MODE = "OUTLINE";
var SLIDE_COUNT;
var SLIDE_INDEX;

window.onload = function() {
	init();
};

document.onkeydown = function(e) {
	//alert(e.keyCode);
	keyboard(e.keyCode);
}

window.onhashchange = function(e) {
	SLIDE_INDEX = parseInt(location.hash.split("-")[1]);
	//alert(SLIDE_INDEX);
}

function init() {
	// Assign slide IDs
	var slides = document.getElementsByClassName("xo-slide");
	SLIDE_COUNT = slides.length;
	for (var i=0; i < SLIDE_COUNT; i++) {
		slides[i].setAttribute("id","slide-" + (i+1));
	}
	
	// Cue up first slide
	//location.hash = "slide-1";
	//SLIDE_INDEX = 1;
	//alert(window.history.length);
}

//+ Delegates keyboard inputs
function keyboard(key) {
	var current;
	var next;
	var previous;
	var slide;
	
	switch(key) {
		case 83:	// s
			start_slidexo();
			break;
		case 86:	// v
			toggle_mode();
			break;
		case 10: 	// return
		case 13: 	// enter
		case 32: 	// spacebar
		case 34: 	// page down
		case 39: 	// rightkey
		case 40: 	// downkey			
			if (SLIDE_INDEX < SLIDE_COUNT) {
				slide = "slide-" + (SLIDE_INDEX + 1);
				location.hash = slide;
				current = document.getElementById(slide);
				next = document.getElementsByClassName("current");
				for (var i=0; i < next.length; i++) {
					removeClass(next[i], "current");
				}
				addClass(current,"current");
			}
			//alert("Next Slide: slide-" + (SLIDE_INDEX + 1));
			break;
		case 8:		// backspace/delete
		case 33: 	// page up
		case 37: 	// leftkey
		case 38: 	// upkey
			if (SLIDE_INDEX != 1) {
				location.hash = "slide-" + (SLIDE_INDEX - 1);
			}
			//alert("Previous Slide: " + location.hash);
			break;
	}
}

//+ Starts the slideshow
function start_slidexo() {
	slideshow_mode();
	location.hash = "slide-1";
}

//+ Outline mode
function outline_mode() {
	if (MODE === "SLIDESHOW") {
		removeClass(ROOT,"slideshow");
		addClass(ROOT,"outline");
	}
	MODE = "OUTLINE";
	//location.search = "";
}

//+ Slideshow mode
function slideshow_mode() {
	if (MODE === "OUTLINE") {
		removeClass(ROOT,"outline");
		addClass(ROOT,"slideshow");
	}
	MODE = "SLIDESHOW";
	//location.search = "slidexo";
}

//+ Switches between Outline and Slideshow modes
function toggle_mode() {
	if (location.search = "slidexo") {
		outline_mode();
	} else {
		slideshow_mode();
	}
}

//*+ Utility
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
*/